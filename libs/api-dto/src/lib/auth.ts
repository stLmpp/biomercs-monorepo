export interface AuthRegister {
  username: string;
  password: string;
  email: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthChangePassword {
  password: string;
  confirmationCode: number;
}

export interface AuthRegisterSteam {
  email: string;
  steamid: string;
}
