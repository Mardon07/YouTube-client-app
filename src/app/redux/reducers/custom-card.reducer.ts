import { createReducer, on } from '@ngrx/store';
import {
  addCustomCard,
  removeCustomCard,
} from '../actions/custom-card.actions';
import { CustomCard } from '../models/custom-card.model';

export const initialState: CustomCard[] = [];

export const customCardReducer = createReducer(
  initialState,
  on(addCustomCard, (state, { card }) => [...state, card]),
  on(removeCustomCard, (state, { cardId }) =>
    state.filter((card) => card.id !== cardId),
  ),
);
