import { createSelector } from "@ngrx/store";

import { IAuthState } from "./auth.reducer";

const selectAuth = (state: any): IAuthState => state.auth;

export const selectAuthState = createSelector(selectAuth, _ => _);
export const selectLoginResponse = createSelector(selectAuth, _ => _.loginResponse);
