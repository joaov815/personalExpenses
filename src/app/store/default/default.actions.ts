import { createReducer, on } from "@ngrx/store";

import { toggleSidebar } from "./default.reducer";

export interface IDefaultState {
  isSidebarHidden: boolean;
}

const initialState: IDefaultState = {
  isSidebarHidden: false,
};

export const defaultReducer = createReducer(
  initialState,
  on(toggleSidebar, state => ({ ...state, isSidebarHidden: !state.isSidebarHidden })),
);
