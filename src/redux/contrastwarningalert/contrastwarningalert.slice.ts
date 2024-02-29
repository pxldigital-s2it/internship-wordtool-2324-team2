import { ContrastWarningAlertState } from "./contrastwarningalert.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const initialState: ContrastWarningAlertState = {
    confirmBeingHandled: false,
    disabled: false,
    open: false
}

export const contrastWarningSlice = createSlice({
    initialState,
    name: "contrast-warning-alert",
    reducers: {
        setConfirmBeingHandled : (state, action: PayloadAction<boolean>) => {
            state.confirmBeingHandled = action.payload;
        },
        setDisabled : (state, action: PayloadAction<boolean>) => {
            state.disabled = action.payload;
        },
        setOpen : (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        }
    }
});

/* ACTIONS */
export const { setOpen, setConfirmBeingHandled, setDisabled } = contrastWarningSlice.actions;

/* SELECTORS */
export const selectOpen = (state: RootState) => state.contrastWarningAlert.open;
export const selectConfirmBeingHandled = (state: RootState) => state.contrastWarningAlert.confirmBeingHandled;
export const selectDisabled = (state: RootState) => state.contrastWarningAlert.disabled;

/* REDUCER */
export default contrastWarningSlice.reducer;