// src/app/redux/selectors/video.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';



export const selectFavoriteState = createFeatureSelector<ResponseItem[]>('favoriteCard');

export const selectFavoriteCards = createSelector(
  selectFavoriteState,
  (state: ResponseItem[]) => state
);

export const isCardFavorite = (cardId: string) =>
  createSelector(selectFavoriteCards, (favoriteCards: ResponseItem[]) => !!favoriteCards.find(card => card.id === cardId));
