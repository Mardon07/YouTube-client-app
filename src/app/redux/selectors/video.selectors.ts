// src/app/redux/selectors/video.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';
import { AppState } from '../reducers';

// export const selectVideoState = createFeatureSelector<ResponseItem[]>('video');

export const selectYouTubeVideos = (state: AppState) => state.videoCard;
// export const selectCurrentPage = (state: AppState) => state.currentPage;

export const selectAllVideos = createSelector(
  selectYouTubeVideos,
  (state: ResponseItem[]) => state,
);
export const selectGetVideoById = (id: string) =>
  createSelector(selectYouTubeVideos, (videos: ResponseItem[]) =>
    videos.find((video) => video.id === id),
  );

// export const selectFavoriteVideos = createSelector(
//   selectVideoState,
//   (state: ResponseData[]) =>
//     state.filter((video) => state.favoriteVideoIds.includes(video)),
// );
