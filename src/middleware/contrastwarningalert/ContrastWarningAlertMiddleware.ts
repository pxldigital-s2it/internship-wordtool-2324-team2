import {
    setConfirmBeingHandled,
    setDisabled,
    setOpen
} from "../../redux/contrastwarningalert/contrastwarningalert.slice";
import { AppDispatch } from "../../redux/store";

export const closeContrastWarningAlert = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setDisabled(true));
        dispatch(setConfirmBeingHandled(false));
        dispatch(setOpen(false));
    }
}

export const openContrastWarningAlert = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setDisabled(false));
        dispatch(setOpen(true));
    }
}