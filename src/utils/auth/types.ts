export interface AuthModel {
  accessToken: string;
  jwtClaims: any;
  redirect: string;
  refreshToken: string;
  accessExpiration: number;
  refreshExpiration: number;
}

export interface CookieOptions {
  httpOnly: boolean;
  maxAge: number;
  sameSite: any;
  secure: boolean;
}

export interface LoginModel {
  clientId: number;
  email: string;
  grantType: string;
  password: string;
  rememberMe: boolean;
  scope: string;
}

export interface LoginUIModel {
  email: string;
  password: string;
  redirect: string;
  rememberMe: boolean;
}

export interface RegisterModel {
  clientId: number;
  email: string;
  firstName: string;
  grantType: string;
  lastName: string;
  password: string;
  scope: string;
}

export interface RegisterUIModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  redirect: string;
}

export interface RenewModel {
  clientId: number;
  grantType: string;
  refreshToken: string;
  scope: string;
}

export interface PasswordResetModel {
  clientId: number;
  email: string;
}

export interface PasswordResetUIModel {
  email: string;
}

export interface TokenModel {
  accessToken: string;
  redirect: string;
  refreshToken: string;
}

export interface TokenProps {
  accessLife: number;
  refreshLife: number;
  renew: boolean;
  valid: boolean;
}
