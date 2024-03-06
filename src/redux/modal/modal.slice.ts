import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { ModalState } from "./modal.types";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";


export const initialState: ModalState = {
    create: true,
    open: false,
    title: ""
}

export const modalSlice = createSlice({
    initialState,
    name: "modal",
    reducers: {
        setCategory: (state, action: PayloadAction<Category>) => {
            state.category = action.payload;
        },
        setCategoryId: (state, action: PayloadAction<string>) => {
            state.categoryId = action.payload;
        },
        setCreate: (state, action: PayloadAction<boolean>) => {
            state.create = action.payload;
        },
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setSubCategory: (state, action: PayloadAction<SubCategory>) => {
            state.subCategory = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        }
    }
});


/* ACTIONS */
export const { setCategory, setCategoryId, setCreate, setOpen, setSubCategory, setTitle } = modalSlice.actions


/* SELECTORS */
export const selectCategory = (state: RootState) => state.modal.category;
export const selectCategoryId = (state: RootState) => state.modal.categoryId;
export const selectCreate = (state: RootState) => state.modal.create;
export const selectOpen = (state: RootState) => state.modal.open;
export const selectSubCategory = (state: RootState) => state.modal.subCategory;
export const selectTitle = (state: RootState) => state.modal.title;


/* REDUCER */
export default modalSlice.reducer;