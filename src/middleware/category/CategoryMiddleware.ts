import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../redux/category/category.slice";
import { AppDispatch } from "../../redux/store";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";
import { deleteById, getAll, update } from "../../utils/StorageUtils";
import { StorageKeys } from "../../utils/StorageUtils.types";

export const loadData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(loadDataStart());
            const categories = getAll(StorageKeys.CATEGORY);;
            const subCategories = getAll(StorageKeys.SUBCATEGORY);

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
            deleteById(StorageKeys.SUBCATEGORY, subCategoryId)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}

export const updateSubCategoryIsFavorite = (subCategoryId: string, isFavorite: boolean) => {
    return async (dispatch: AppDispatch) => {
        try {
            update(StorageKeys.SUBCATEGORY, subCategoryId, { isFavorite: isFavorite });
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}

export const deleteCategory = (categoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            deleteById(StorageKeys.CATEGORY, categoryId)
            await dispatch(loadData())
        } catch (error) {
            console.error(error.message);
        }
    };
}
