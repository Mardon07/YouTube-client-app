import { createSelector } from "@ngrx/store";
import { CustomCard } from "../models/custom-card.model";
import { AppState } from "../reducers";

export const selectCustomCards = (state: AppState) => state.customCard;


export const selectAllCards = createSelector(
    selectCustomCards,
    (state: CustomCard[]) => state,
  );
  export const selectGetCustomCardById = (id: string) =>
    createSelector(selectCustomCards, (cards: CustomCard[]) =>
    cards.find((card) => card.id === id),
    );
  