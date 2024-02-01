import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../redux/category/category.slice";
import { AppDispatch } from "../../redux/store";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";
import { deleteById, getAll } from "../../utils/StorageUtils";

export const loadData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(loadDataStart());
            const categories = getAll("categories");;
            const subCategories = getAll("subCategories");

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
            deleteById("subCategories", subCategoryId)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}

export const deleteCategory = (categoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            deleteById("categories", categoryId)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}
