import {
    setCategory,
    setCreate,
    setOpen,
    setSubCategory,
    setTitle
} from "../../redux/modal/modal.slice";
import { AppDispatch } from "../../redux/store";
import { categoryContextMenu } from "../../patterns/observer";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";
import STRING_RESOURCES from "../../components/buttons/Strings";
import { setColour } from "../../redux/category/category.slice";
import { loadData } from "../category/CategoryMiddleware";
import { getById, save, update } from "../../utils/StorageUtils";
import { StorageKeys } from "../../utils/StorageUtils.types";
import SubSubCategory from "../../types/SubSubCategory";


export const openCreateCategoryModal = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setTitle(STRING_RESOURCES.buttons.add.label));
        dispatch(setCreate(true));
        dispatch(setCategory({ code: "", colour: "", id: "", title: "" }));
        dispatch(setOpen(true));
    };
};

export const openCreateSubCategoryModal = (category: Category) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setTitle(categoryContextMenu.getSubCategoryLabel()));
        dispatch(setCreate(true));
        dispatch(setCategory(category));
        const subCategory: SubCategory = {
            categoryId: category.id,
            description: null,
            isFavorite: false
        };
        dispatch(setSubCategory(subCategory));
        dispatch(setOpen(true));
    };
};


export const openUpdateCategoryModal = (category: Category) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setTitle(categoryContextMenu.getEditLabel()));
        dispatch(setCreate(false));
        dispatch(setCategory(category));
        dispatch(setColour(category.colour));
        dispatch(setSubCategory(undefined));
        dispatch(setOpen(true));
    };
};

export const closeModal = () => {
    return (dispatch: AppDispatch) => {
        dispatch(setOpen(false));
        dispatch(setSubCategory(undefined));
        dispatch(setTitle(""));
        dispatch(setCategory(undefined));
        dispatch(setColour(undefined));
    };
};

export const getCategory = async (categoryId: string): Promise<Category> => {
    let category;
    try {
        const categoryResponse = getById(StorageKeys.CATEGORY, categoryId);
        if (categoryResponse) {
            category = categoryResponse;
        }
    } catch (e) {
        // TODO: Toast to notify user smth went wrong.
        console.error(e.message);
    }

    return category;
};

export const saveCategory = (category: Category) => {
    return async (dispatch: AppDispatch) => {
        try {
            save(StorageKeys.CATEGORY, category);
            await dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};

export const updateCategory = (id: string, category: Category) => {
    return async (dispatch: AppDispatch) => {
        try {
            update(StorageKeys.CATEGORY, id, category);
            await dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};

export const saveSubCategory = (subCategory: SubCategory) => {
    return async (dispatch: AppDispatch) => {
        try {
            save(StorageKeys.SUBCATEGORY, subCategory);
            dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};

export const updateSubCategory = (id: string, subCategory: Partial<SubCategory>) => {
    return async (dispatch: AppDispatch) => {
        try {
            update(StorageKeys.SUBCATEGORY, id, subCategory);
            await dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};

export const saveSubSubCategory = (subSubCategory: SubSubCategory) => {
    return async (dispatch: AppDispatch) => {
        try {
            save(StorageKeys.SUBSUBCATEGORY, subSubCategory);
            dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};

export const updateSubSubCategory = (id: string, subSubCategory: Partial<SubSubCategory>) => {
    return async (dispatch: AppDispatch) => {
        try {
            update(StorageKeys.SUBSUBCATEGORY, id, subSubCategory);
            await dispatch(loadData());
            dispatch(closeModal());
        } catch (e) {
            // TODO: Toast to notify user smth went wrong.
            console.error(e.message);
        }
    };
};