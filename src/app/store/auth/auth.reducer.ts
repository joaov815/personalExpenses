import { createReducer, on } from "@ngrx/store";

import { LoginResponse } from "../../models/auth.model";
import { StorageConstantsEnum } from "../../storage/constants";

import { authLogin, authLogout, loginError, loginSuccess } from "./auth.actions";

export interface IAuthState {
  keepSignedIn: boolean;
  loginResponse: LoginResponse | null;
  error: string | null;
  isLoading: boolean;
}

export const getLoginResponseFromStorage = (): LoginResponse | null => {
  const response =
    localStorage.getItem(StorageConstantsEnum.LOGIN_RESPONSE) ??
    sessionStorage.getItem(StorageConstantsEnum.LOGIN_RESPONSE);

  if (!response) return null;

  return JSON.parse(response) as LoginResponse;
};

const initialState: IAuthState = {
  keepSignedIn: false,
  error: null,
  isLoading: false,
  loginResponse: getLoginResponseFromStorage(),
};

export const authReducer = createReducer(
  initialState,
  on(authLogin, state => ({ ...state, error: null, isLoading: true })),
  on(authLogout, () => initialState),
  on(loginError, (state, { error }) => ({ ...state, error })),
  on(loginSuccess, (state, val) => ({
    ...state,
    ...val,
    error: null,
    isLoading: false,
  })),
);
