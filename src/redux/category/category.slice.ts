import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import Category from "../../types/Category";
import { CategoryState } from "./category.types";


export const initialState: CategoryState = {
    isLoading: false
}

export const categorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        loadDataFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        loadDataStart: (state) => {
            state.isLoading = true;
        },
        loadDataSuccess: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.isLoading = false;
        },
        setCategory: (state, action: PayloadAction<Category>) => {
            state.category = action.payload;
        },
        setCategoryId: (state, action: PayloadAction<string>) => {
            state.categoryId = action.payload;
        },
        setColour: (state, action: PayloadAction<string>) => {
            state.colour = action.payload;
        }
    }
});


/* ACTIONS */
export const {
    loadDataFailure,
    loadDataStart,
    loadDataSuccess,
    setCategory,
    setCategoryId,
    setColour
} = categorySlice.actions


/* SELECTORS */
export const selectCategory = (state: RootState) => state.category.category;
export const selectCategoryId = (state: RootState) => state.category.categoryId;
export const selectColour = (state: RootState) => state.category.colour;
export const selectData = (state: RootState) => state.category.categories;
export const selectError = (state: RootState) => state.category.error;
export const selectIsLoading = (state: RootState) => state.category.isLoading;


/* REDUCER */
export default categorySlice.reducer;