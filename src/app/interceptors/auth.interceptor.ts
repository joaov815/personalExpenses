import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAfter } from "date-fns";
import { catchError, Observable, switchMap, take, throwError } from "rxjs";

import { environment } from "../environment/environment";
import { LoginResponse } from "../models/auth.model";
import { loginSuccess } from "../store/auth/auth.actions";
import { selectAuthState } from "../store/auth/auth.selectors";
import { AuthService } from "../services/auth.service";
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
  if (req.url === environment.authApiUrl) return next(req);

  const router = inject(Router);
  const store = inject(Store);
  const authService = inject(AuthService);

  return store.select(selectAuthState).pipe(
    take(1),
    switchMap(({ keepSignedIn, loginResponse }) => {
      if (isAfter(new Date(), new Date(loginResponse.tokenExpiresAt))) {
        return authService.getNewToken(loginResponse.refresh_token).pipe(
          switchMap(res => {
            const storage = keepSignedIn ? localStorage : sessionStorage;
            const newLoginResponse = new LoginResponse(res);

            storage.setItem(StorageConstantsEnum.LOGIN_RESPONSE, JSON.stringify(newLoginResponse));
            store.dispatch(loginSuccess({ keepSignedIn, loginResponse }));

            return getNext$(req, router, newLoginResponse, next);
          }),
        );
      }

      return getNext$(req, router, loginResponse, next);
    }),
  );
};
