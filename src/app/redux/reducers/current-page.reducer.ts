import { createReducer, on } from '@ngrx/store';
import { changeCurrentPage } from '../actions/current-page.actions';
export interface CurrentPageState{
    page: number
}

export const initialState: CurrentPageState = {
  page: 0,
};

export const currentPageReducer = createReducer(
  initialState,
  on(changeCurrentPage, (page) => page),
);
