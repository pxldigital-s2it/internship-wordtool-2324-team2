import { AppDispatch } from "../../redux/store";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";

// Action types
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Actions
export const loadCategories = () => ({ type: LOAD_CATEGORIES });
export const setCategories = (categories: Category[]) => ({ payload: categories, type: SET_CATEGORIES });
export const createCategory = (category: Category) => ({ payload: category, type: CREATE_CATEGORY });
export const updateCategory = (id: string, updatedCategory: Category) => ({
  payload: { id, updatedCategory },
  type: UPDATE_CATEGORY
});
export const deleteCategory = (id: string) => ({ payload: id, type: DELETE_CATEGORY });

// Middleware
export const categoryDataMiddleware = (store: { dispatch: AppDispatch }) => (next: any) => async (action: any) => {
  next(action);

  switch (action.type) {
    case LOAD_CATEGORIES:
      try {
        const categoriesResponse = await fetch('http://localhost:3001/categories').then(response => response.json());
        const subCategoriesResponse = await fetch('http://localhost:3001/subCategories').then(response => response.json());

        // Combine categories with their subcategories
        const combinedData = categoriesResponse.map((category: Category) => ({
          ...category,
          subCategories: subCategoriesResponse.filter((subCategory: SubCategory) => subCategory.categoryId === category.id)
        }));

        store.dispatch(setCategories(combinedData));
      } catch (e) {
        console.error('Error fetching categories:', e);
      }
      break;

    case CREATE_CATEGORY:
      try {
        const category: Category = action.payload;
        await fetch('http://localhost:3001/categories', {
          body: JSON.stringify(category),
          headers: { "Content-Type": "application/json" },
          method: "POST"
        });
        store.dispatch(loadCategories());
      } catch (e) {
        console.error('Error creating category:', e);
      }
      break;

    case UPDATE_CATEGORY:
      try {
        const { id, updatedCategory } = action.payload;
        await fetch(`http://localhost:3001/categories/${id}`, {
          body: JSON.stringify(updatedCategory),
          headers: { "Content-Type": "application/json" },
          method: "PUT"
        });
        store.dispatch(loadCategories());
      } catch (e) {
        console.error('Error updating category:', e);
      }
      break;

    case DELETE_CATEGORY:
      try {
        const id = action.payload;
        await fetch(`http://localhost:3001/categories/${id}`, {
          method: 'DELETE'
        });
        store.dispatch(loadCategories());
      } catch (e) {
        console.error('Error deleting category:', e);
      }
      break;

    default:
      break;
  }
};
