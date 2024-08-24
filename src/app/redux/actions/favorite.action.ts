import { createAction, props } from '@ngrx/store';
import { ResponseItem } from '../../youtube/models/video-response.model';

export const addFavoruteCard = createAction(
  '[Favorite Card] Add Favorite Card',
  props<{ video: ResponseItem }>(),
);
export const deleteFavoruteCard = createAction(
  '[Favorite Card] Delete Favorite Card',
  props<{ videoId: string }>(),
);
