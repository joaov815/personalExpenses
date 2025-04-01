import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";

import { selectLoginResponse } from "../store/auth/auth.selectors";

export const authGuard: CanActivateChildFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectLoginResponse).pipe(
    map(loginResponse => {
      const hasLoginResponse = !!loginResponse;

      if (!hasLoginResponse) router.navigateByUrl("login");

      return hasLoginResponse;
    }),
  );
};
