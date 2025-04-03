import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAfter } from "date-fns";
import { catchError, Observable, switchMap, take, throwError } from "rxjs";

import { environment } from "../environment/environment";
import { LoginResponse } from "../models/auth.model";
import { AuthService } from "../services/auth.service";
import { selectAuthState } from "../store/auth/auth.selectors";
import { StorageConstantsEnum } from "../storage/constants";

const getNext$ = (
  req: HttpRequest<unknown>,
  router: Router,
  loginResponse: LoginResponse,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(
    req.clone({
      headers: req.headers.set("Authorization", `Bearer ${loginResponse.access_token}`),
    }),
  ).pipe(
    catchError(err => {
      if (err.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        router.navigateByUrl("login");
      }

      return throwError(() => err);
    }),
  );
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(`${environment.authApiUrl}/token`)) return next(req);

  const router = inject(Router);
  const store = inject(Store);
  const authService = inject(AuthService);

  return store.select(selectAuthState).pipe(
    take(1),
    switchMap(({ keepSignedIn, loginResponse }) => {
      if (isAfter(new Date(), loginResponse.tokenExpiresAt)) {
        return authService.getNewToken(loginResponse.refresh_token).pipe(
          switchMap(res => {
            const storage = keepSignedIn ? localStorage : sessionStorage;
            const newLoginResponse = new LoginResponse(res);

            storage.setItem(StorageConstantsEnum.LOGIN_RESPONSE, JSON.stringify(newLoginResponse));

            return getNext$(req, router, loginResponse, next);
          }),
        );
      }

      return getNext$(req, router, loginResponse, next);
    }),
  );
};
