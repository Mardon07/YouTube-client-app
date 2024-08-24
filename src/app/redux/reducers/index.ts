import { isDevMode } from '@angular/core';
import { ResolveData } from '@angular/router';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';
import { CustomCard } from '../models/custom-card.model';
import { currentPageReducer, CurrentPageState } from './current-page.reducer';
import { customCardReducer } from './custom-card.reducer';
import { favoriteCardReducer } from './favorite-card.reducer';
import { youtubeVideoReducer } from './video.reducer';

export interface AppState {
  customCard: CustomCard[];
  videoCard: ResponseItem[];
  currentPage: CurrentPageState;
  favoriteCard: ResponseItem[]
}

export const reducers: ActionReducerMap<AppState> = {
  customCard: customCardReducer,
  videoCard: youtubeVideoReducer,
  currentPage: currentPageReducer,
  favoriteCard: favoriteCardReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
