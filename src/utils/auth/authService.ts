import {
  AuthModel,
  CookieOptions,
  LoginModel,
  LoginUIModel,
  PasswordResetModel,
  RegisterModel,
  RegisterUIModel,
  RenewModel,
  TokenModel,
  TokenProps,
} from './types';
import { BROWSER } from './../app/const';
import { GRANT_TYPE, SCOPE } from './const';

const authService = {
  getAuthModel(
    data: TokenModel,
    decodedToken: any,
    accessLife: number,
    refreshLife: number
  ): AuthModel {
    return {
      accessToken: data.accessToken,
      jwtClaims: decodedToken,
      redirect: data.redirect,
      refreshToken: data.refreshToken,
      accessExpiration: accessLife,
      refreshExpiration: refreshLife,
    };
  },

  getCookieOptions(
    refreshLife: number,
    uaBrowser: string,
    secure: boolean
  ): CookieOptions {
    return {
      httpOnly: true,
      maxAge: refreshLife,
      sameSite: uaBrowser === BROWSER.SAFARI ? false : 'lax',
      secure,
    };
  },

  getLoginModel(data: LoginUIModel, clientId: number): LoginModel {
    return {
      clientId,
      email: data.email,
      grantType: GRANT_TYPE.PASSWORD,
      password: data.password,
      rememberMe: data.rememberMe,
      scope: SCOPE.OFFLINE_ACCESS,
    };
  },

  getPasswordResetModel(email: string, clientId: number): PasswordResetModel {
    return {
      clientId,
      email,
    };
  },

  getRegisterModel(data: RegisterUIModel, clientId: number): RegisterModel {
    return {
      clientId,
      email: data.email,
      firstName: data.firstName,
      grantType: GRANT_TYPE.PASSWORD,
      lastName: data.lastName,
      password: data.password,
      scope: SCOPE.OFFLINE_ACCESS,
    };
  },

  getRenewModel(clientId: number, token: string): RenewModel {
    return {
      clientId,
      grantType: GRANT_TYPE.PASSWORD,
      refreshToken: token,
      scope: SCOPE.OFFLINE_ACCESS,
    };
  },

  getTokenModel(data: any): TokenModel {
    return {
      accessToken: data.accessToken,
      redirect: data.redirect ? data.redirect : '',
      refreshToken: data.refreshToken,
    };
  },

  getTokenProps(decodedToken: any, issuer: string): TokenProps {
    const currentTime = Math.round(+new Date() / 1000);

    const accessLife = decodedToken.exp - currentTime;
    const accessBuffer = 15;
    const accessBalance = accessLife - accessBuffer;

    const refreshLife = decodedToken.rexp - currentTime - 15;
    const validIssuer = decodedToken.iss === issuer;

    return {
      accessLife,
      refreshLife,
      renew: validIssuer && accessBalance <= 0 && refreshLife > 0,
      valid: validIssuer && accessBalance > 0,
    };
  },
};

export default authService;
