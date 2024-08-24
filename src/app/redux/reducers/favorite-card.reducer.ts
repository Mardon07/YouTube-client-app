import { createReducer, on } from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';
import { addFavoruteCard, deleteFavoruteCard } from '../actions/favorite.action';

const initialState: ResponseItem[] = [];

export const favoriteCardReducer = createReducer(
  initialState,
  on(addFavoruteCard, (state, { video }) => [...state, video]),
  on(deleteFavoruteCard, (state, { videoId }) =>  state.filter((card) => card.id !== videoId)),
);
