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

/*
 * Method to get full category data including subcategories by category ID
 */
export const getCategoryDataById = (categoryId: string) => {
    return async () => {
        try {
            // fetch all categories and subcategories
            const categories = getAll(StorageKeys.CATEGORY);
            const subCategories = getAll(StorageKeys.SUBCATEGORY);

            // find the specific category by ID
            const specificCategory = categories.find((category: Category) => category.id === categoryId);

            if (!specificCategory) {
                throw new Error("Category not found");
            }

            // filter subcategories that belong to the specific category
            const filteredSubCategories = subCategories.filter((subCategory: SubCategory) => subCategory.categoryId === categoryId);

            // combine category with its subcategories
            const combinedData = {
                ...specificCategory,
                subCategories: filteredSubCategories
            };

            console.log(combinedData);

            return combinedData;
        } catch (error) {
            console.error("Error getting category data:", error.message);
        }
    };
};