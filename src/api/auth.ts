import {
  ENDPOINT,
  LoginModel,
  PasswordResetModel,
  RegisterModel,
  RenewModel,
  TOKEN,
} from '~/utils/auth';

const authAPI = {
  getTokens() {
    const accessToken = localStorage.getItem(TOKEN.ACCESS_NAME);
    const refreshToken = localStorage.getItem(TOKEN.REFRESH_NAME);

    return {
      accessToken,
      refreshToken,
    };
  },

  login(model: LoginModel) {
    return useAxios().$post(ENDPOINT.LOGIN, model);
  },

  passwordReset(model: PasswordResetModel) {
    return useAxios().$post(ENDPOINT.RESET_PASSWORD, model);
  },

  register(model: RegisterModel) {
    return useAxios().$post(ENDPOINT.REGISTER, model);
  },

  removeTokens() {
    useAxios().removeToken();

    localStorage.removeItem(TOKEN.ACCESS_NAME);
    localStorage.removeItem(TOKEN.REFRESH_NAME);
  },

  renewTokens(model: RenewModel) {
    return useAxios().$post(ENDPOINT.RENEW_TOKENS, model);
  },

  revokeRefreshToken(model: any) {
    return useAxios().$post(ENDPOINT.REVOKE_TOKEN, model);
  },

  setTokens(accessToken: string, refreshToken: string) {
    useAxios().setToken(accessToken);

    localStorage.setItem(TOKEN.ACCESS_NAME, accessToken);
    localStorage.setItem(TOKEN.REFRESH_NAME, refreshToken);
  },
};

export default authAPI;
