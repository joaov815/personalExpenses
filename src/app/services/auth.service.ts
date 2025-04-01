import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../environment/environment";
import { ILoginPayload, ILoginResponse } from "../models/auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login({ user, password }: ILoginPayload): Observable<ILoginResponse> {
    const body = new URLSearchParams();

    body.set("client_id", "webapp");
    body.set("grant_type", "password");
    body.set("username", user);
    body.set("password", password);
    body.set("scope", "openid profile");

    return this.httpClient.post<ILoginResponse>(environment.authApiUrl, body, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  }

  getNewToken(refreshToken: string): Observable<any> {
    const body = new URLSearchParams();

    body.set("client_id", "webapp");
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);

    return this.httpClient.post<any>(environment.authApiUrl, body, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  }
}
