import { SettingsState } from "./settings.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const initialState: SettingsState = {
  alwaysInsertFullText: false
}

export const settingsSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    toggleAlwaysInsertFullText: (state) => {
      state.alwaysInsertFullText = !state.alwaysInsertFullText;
    }
  }
});

export const { toggleAlwaysInsertFullText } = settingsSlice.actions;

export const selectAlwaysInsertFullText = (state: RootState) => state.settings.alwaysInsertFullText;

export default settingsSlice.reducer;
