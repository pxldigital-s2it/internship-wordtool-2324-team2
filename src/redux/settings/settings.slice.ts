import { SettingsState } from "./settings.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const initialState: SettingsState = {
  alwaysInsertFullText: false,
  favoritesHoisting: false,
  favoritesHiding: false
}

export const settingsSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    toggleAlwaysInsertFullText: (state) => {
      state.alwaysInsertFullText = !state.alwaysInsertFullText;
    },
    toggleFavoritesHoisting: (state) => {
      state.favoritesHoisting = !state.favoritesHoisting;
    },
    toggleFavoritesHiding: (state) => {
      state.favoritesHiding = !state.favoritesHiding;
    }
  }
});

export const { toggleAlwaysInsertFullText, toggleFavoritesHoisting, toggleFavoritesHiding } = settingsSlice.actions;

export const selectAlwaysInsertFullText = (state: RootState) => state.settings.alwaysInsertFullText;
export const selectFavoritesHoisting = (state: RootState) => state.settings.favoritesHoisting;
export const selectFavoritesHiding = (state: RootState) => state.settings.favoritesHiding;

export default settingsSlice.reducer;
