import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { LoginResponse } from "../../models/auth.model";
import { StorageConstantsEnum } from "../../storage/constants";
import { AuthService } from "../../services/auth.service";

import { authLogin, loginError, loginSuccess } from "./auth.actions";

export const loginEffects = createEffect(
  (actions$ = inject(Actions), router = inject(Router), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authLogin),
      switchMap(({ keepSignedIn, user, password }) =>
        authService.login({ user, password }).pipe(
          map(loginResponse => {
            const storage = keepSignedIn ? localStorage : sessionStorage;
            const loginRes = new LoginResponse(loginResponse);

            storage.setItem(StorageConstantsEnum.LOGIN_RESPONSE, JSON.stringify(loginRes));
            router.navigate(["expenses"]);

            return loginSuccess({ keepSignedIn, loginResponse: loginRes });
          }),
          catchError(error => {
            console.error(error);
            return of(loginError({ error: error?.error ?? "Login error" }));
          }),
        ),
      ),
    ),
  { functional: true },
);

export const logoutEffects = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authLogin),
      tap(() => {
        localStorage.clear();
        sessionStorage.clear();

        router.navigateByUrl("login");
      }),
    ),
  { functional: true, dispatch: false },
);
