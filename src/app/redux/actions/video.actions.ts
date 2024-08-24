import { createAction, props } from '@ngrx/store';
import {
  ResponseItem,
} from '../../youtube/models/video-response.model';

export const loadYouTubeVideosSuccess = createAction(
  '[Video] Load Video',
  props<{ videos: ResponseItem[] }>(),
);
