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

function getInitialState(): IAuthState {
  let response =
    localStorage.getItem(StorageConstantsEnum.LOGIN_RESPONSE) ??
    sessionStorage.getItem(StorageConstantsEnum.LOGIN_RESPONSE) ??
    null;

  if (response) {
    response = JSON.parse(response);
  }

  return {
    keepSignedIn: false,
    error: null,
    isLoading: false,
    loginResponse: response as unknown as LoginResponse | null,
  };
}

export const authReducer = createReducer(
  getInitialState(),
  on(authLogin, state => ({ ...state, error: null, isLoading: true })),
  on(authLogout, () => {
    localStorage.clear();
    sessionStorage.clear();

    return getInitialState();
  }),
  on(loginError, (state, { error }) => ({ ...state, error })),
  on(loginSuccess, (state, val) => ({
    ...state,
    ...val,
    error: null,
    isLoading: false,
  })),
);
