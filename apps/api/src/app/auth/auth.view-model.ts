import { AuthRegisterVW, AuthSteamLoginSocketErrorType, AuthSteamLoginSocketVW } from '@biomercs/api-interfaces';

export class AuthRegisterViewModel implements AuthRegisterVW {
  email!: string;
  message!: string;
  idUser!: number;
}

export class AuthSteamLoginSocketViewModel implements AuthSteamLoginSocketVW {
  uuid!: string;
  token!: string;
  error?: string;
  errorType?: AuthSteamLoginSocketErrorType;
  steamid?: string;
  idUser?: number;
}
