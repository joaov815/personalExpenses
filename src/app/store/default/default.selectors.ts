import { createSelector } from "@ngrx/store";

import { IDefaultState } from "./default.actions";

const selectDefault = (state: any): IDefaultState => state.default;

export const selectIsSidebarHidden = createSelector(selectDefault, state => state.isSidebarHidden)
