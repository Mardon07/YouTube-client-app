import { createAction, props } from '@ngrx/store';

export const changeCurrentPage = createAction(
  '[Current Page] Change current page',
  props<{ page: number }>(),
);
