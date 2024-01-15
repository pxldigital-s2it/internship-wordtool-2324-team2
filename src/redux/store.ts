import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { initialState as DEFAULT_MODAL_STATE } from "./modal/modal.slice";
import categoryDataReducer, { initialState as DEFAULT_CATEGORYDATA_STATE } from './categoryData/categoryData.slice';
import { State } from "./store.types";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    categoryData: categoryDataReducer,
    modal: modalReducer
  }
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const initialState: State = {
  categoryData: DEFAULT_CATEGORYDATA_STATE,
  modal: DEFAULT_MODAL_STATE
};