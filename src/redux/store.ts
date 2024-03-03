import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { initialState as DEFAULT_MODAL_STATE } from "./modal/modal.slice";
import categoryReducer, { initialState as DEFAULT_CATEGORY_STATE } from "./category/category.slice";
import settingsReducer, { initialState as DEFAULT_SETTINGS_STATE } from "./settings/settings.slice";
import { State } from "./store.types";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    category: categoryReducer,
    modal: modalReducer,
    settings: settingsReducer
  }
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const initialState: State = {
  category: DEFAULT_CATEGORY_STATE,
  modal: DEFAULT_MODAL_STATE,
  settings: DEFAULT_SETTINGS_STATE
};
