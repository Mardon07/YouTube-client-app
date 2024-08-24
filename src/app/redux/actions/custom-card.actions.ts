import { createAction, props } from '@ngrx/store';
import { CustomCard } from '../models/custom-card.model';

export const addCustomCard = createAction(
  '[Admin Page] Add Custom Card',
  props<{ card: CustomCard }>(),
);
export const removeCustomCard = createAction(
  '[List Page] Remove Custom Card',
  props<{ cardId: string }>(),
);
export const loadCustomCards = createAction('[Admin Page] Load Custom Cards');

