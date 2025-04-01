import { createAction, props } from "@ngrx/store";

import { ILogin } from "../../models/auth.model";

import { IAuthState } from "./auth.reducer";

export const authLogin = createAction("[Auth] Login", props<ILogin>());
export const authLogout = createAction("[Auth] Logout", props<ILogin>());
export const loginSuccess = createAction("[Auth] Success", props<Pick<IAuthState, "loginResponse" | "keepSignedIn">>());
export const loginError = createAction("[Auth] Error", props<Pick<IAuthState, "error">>());
