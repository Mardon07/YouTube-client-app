import { createReducer, on } from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';
import { loadYouTubeVideosSuccess } from '../actions/video.actions';

const initialState: ResponseItem[] = [];

export const youtubeVideoReducer = createReducer(
  initialState,
  on(loadYouTubeVideosSuccess, (state, { videos }) => videos),
);
