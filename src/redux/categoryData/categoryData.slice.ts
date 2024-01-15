import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Category from '../../types/Category';
import axios from 'axios';
import type { RootState } from "../store"; // Import RootState

interface CategoryDataState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: CategoryDataState = {
  categories: [],
  error: null,
  isLoading: false
};

// thunk action for loading categories
export const loadCategories = createAsyncThunk(
  'categoryData/loadCategories',
  async () => {
    const response = await axios.get('/categories');
    return response.data;
  }
);

const categoryDataSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(loadCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    }).addCase(loadCategories.pending, (state) => {
      state.isLoading = true;
    }).addCase(loadCategories.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
    });
  },
  initialState,
  name: "categoryData",
  reducers: {
    createCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateCategory: (state, action: PayloadAction<{ id: string, updatedCategory: Category }>) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload.updatedCategory;
      }
    }
  }
});

// Actions
export const { createCategory, updateCategory, deleteCategory, setLoading, setError } = categoryDataSlice.actions;

// Selectors
export const selectCategories = (state: RootState) => state.categoryData.categories;
export const selectIsLoading = (state: RootState) => state.categoryData.isLoading;
export const selectError = (state: RootState) => state.categoryData.error;

// Reducer
export default categoryDataSlice.reducer;
