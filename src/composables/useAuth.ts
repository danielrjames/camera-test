import {
  AuthModel,
  LoginUIModel,
  PasswordResetUIModel,
  RegisterUIModel,
  TokenModel,
  authService,
} from '../utils/auth';
import { ErrorException } from '~/utils/error';
import { addBodyClass, removeBodyClass } from '~/utils/app';
import { jwtDecode } from 'jwt-decode';
import authAPI from '../api/auth';

export const useAuth = () => {
  const appStore = useAppStore();
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const TOKEN_ISSUER = import.meta.env.VITE_API_URL;

  let renewTimer: any;

  const authenticateUser = async (data: AuthModel) => {
    try {
      userStore.updateUser(data.jwtClaims);
      authStore.authenticate(data.accessToken, data.refreshToken);

      addBodyClass(['auth']);

      startTimer(data.accessExpiration);

      if (data.redirect.length > 0 || route.meta.public) {
        await router.push({
          path: data.redirect.length > 0 ? data.redirect : '/',
        });
      }

      return authAPI.setTokens(data.accessToken, data.refreshToken);
    } catch (err) {
      return await removeTokens();
    }
  };

  const checkTokens = async () => {
    try {
      const { accessToken, refreshToken } = authAPI.getTokens();

      if (!accessToken || !refreshToken) {
        return await removeTokens();
      }

      const model = authService.getTokenModel({
        accessToken,
        refreshToken,
      });

      return await validateTokens(model);
    } catch (err) {
      return await removeTokens();
    } finally {
      authStore.setAuthInit(true);
    }
  };

  const handleAuthError = (err: Error) => {
    authStore.resetAuth();

    throw new ErrorException(err.message);
  };

  const login = async (data: LoginUIModel) => {
    if (appStore.loading || authStore.authSubmit) {
      return;
    }

    try {
      authStore.setAuthSubmit(true);

      const model = authService.getLoginModel(data, CLIENT_ID);

      const response: any = await authAPI.login(model);

      if (response.access_token && response.refresh_token) {
        const tokenModel = authService.getTokenModel({
          accessToken: response.access_token,
          redirect: data.redirect,
          refreshToken: response.refresh_token,
        });

        return await validateTokens(tokenModel);
      }

      throw new ErrorException('Invalid email and/or password.');
    } catch (err) {
      return handleAuthError(err);
    }
  };

  const logout = async () => {
    appStore.setNavDropdown(false);
    appStore.setMobileNav(false);

    if (route.meta.index) {
      usePageTitle(appStore.base.title, appStore.base.template);
    }

    return await removeTokens(true);
  };

  const passwordReset = async (data: PasswordResetUIModel) => {
    if (appStore.loading) {
      return;
    }

    try {
      appStore.setSpinner(true);

      const model = authService.getPasswordResetModel(data.email, CLIENT_ID);

      return await authAPI.passwordReset(model);
    } catch (err) {
      throw new ErrorException(err.message);
    }
  };

  const register = async (data: RegisterUIModel) => {
    if (appStore.loading || authStore.authSubmit) {
      return;
    }

    try {
      authStore.setAuthSubmit(true);

      const model = authService.getRegisterModel(data, CLIENT_ID);

      const response: any = await authAPI.register(model);

      const tokenModel = authService.getTokenModel({
        accessToken: response.access_token,
        redirect: data.redirect,
        refreshToken: response.refresh_token,
      });

      return await validateTokens(tokenModel);
    } catch (err) {
      return handleAuthError(err);
    }
  };

  const removeTokens = async (logout = false) => {
    revokeRefreshToken();

    authAPI.removeTokens();
    authStore.resetAuth();

    removeBodyClass(['auth']);

    if (route.meta.auth && !logout) {
      await router.replace({
        path: '/sign-in',
        query: { returnUrl: route.fullPath },
      });
    } else if (logout) {
      await router.replace({
        path: '/',
      });
    }
  };

  const renewTokens = async (rtoken = null) => {
    try {
      const refreshToken = rtoken ?? authStore.tokens?.refresh;

      if (refreshToken === null || refreshToken.length < 1) {
        throw new ErrorException('No refresh Token Found');
      }

      const model = authService.getRenewModel(CLIENT_ID, refreshToken);

      const response: any = await authAPI.renewTokens(model);

      const tokenModel = authService.getTokenModel({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });

      return await validateTokens(tokenModel);
    } catch (err) {
      return await removeTokens();
    }
  };

  const revokeRefreshToken = () => {
    const refreshToken: string = authStore.tokens.refresh;

    if (refreshToken?.length > 1) {
      return authAPI.revokeRefreshToken({
        clientId: CLIENT_ID,
        refreshToken,
      });
    }
  };

  const startTimer = (expiration: number) => {
    if (renewTimer) {
      clearTimeout(renewTimer);
    }

    renewTimer = setTimeout(async () => {
      await renewTokens();
    }, expiration * 1000);
  };

  const validateTokens = async (data: TokenModel) => {
    const decodedToken: any = jwtDecode(data.accessToken);

    const props = authService.getTokenProps(decodedToken, TOKEN_ISSUER);

    if (props.valid) {
      const authModel = authService.getAuthModel(
        data,
        decodedToken,
        props.accessLife,
        props.refreshLife
      );

      return await authenticateUser(authModel);
    } else if (props.renew) {
      return await renewTokens(data.refreshToken);
    }

    return await removeTokens();
  };

  return {
    checkTokens,
    login,
    logout,
    passwordReset,
    register,
    removeTokens,
    startTimer,
    validateTokens,
  };
};
