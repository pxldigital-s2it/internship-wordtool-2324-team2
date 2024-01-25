import axios from "axios";
import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../redux/category/category.slice";
import { AppDispatch } from "../../redux/store";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";

export const loadData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(loadDataStart());
            const categoryResponse = await axios.get<Category[]>('http://localhost:3001/categories');
            const categories = categoryResponse.data;
            const subCategoriesResponse = await axios.get<SubCategory[]>('http://localhost:3001/subCategories');
            const subCategories = subCategoriesResponse.data;

            // Combine categories with their subcategories
            const combinedData = categories.map((category: Category) => ({
                ...category,
                subCategories: subCategories.filter((subCategory: SubCategory) => subCategory.categoryId === category.id)
            }));
            dispatch(loadDataSuccess(combinedData));
        } catch (error) {
            dispatch(loadDataFailure(error.message));
        }
    };
}

export const deleteSubCategory = (subCategoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete<SubCategory>(`http://localhost:3001/subCategories/${subCategoryId}`)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}

export const deleteCategory = (categoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete<Category>(`http://localhost:3001/Categories/${categoryId}`)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}