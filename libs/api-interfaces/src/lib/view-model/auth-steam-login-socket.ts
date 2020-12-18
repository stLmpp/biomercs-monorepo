import { AuthSteamLoginSocketErrorType } from '../enum';

export interface AuthSteamLoginSocketVW {
  uuid: string;
  token: string;
  error?: string;
  errorType?: AuthSteamLoginSocketErrorType;
  steamid?: string;
  idUser?: number;
}

export class AuthSteamLoginSocketEvent {
  static eventName = 'logged-steam';
  static namespace = 'auth';
}
