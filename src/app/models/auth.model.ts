import { addSeconds } from "date-fns";

export interface ILoginPayload {
  user: string;
  password: string;
}

export interface ILogin extends ILoginPayload {
  keepSignedIn: boolean;
}

export interface ILoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

export class LoginResponse implements ILoginResponse {
  constructor(response: ILoginResponse) {
    Object.assign(this, response);

    this.tokenExpiresAt = addSeconds(new Date(), response.expires_in);
    this.refreshExpiresAt = addSeconds(new Date(), response.refresh_expires_in);
  }

  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;

  tokenExpiresAt: Date;
  refreshExpiresAt: Date;
}

export interface ILoginError {
  error: string;
}
