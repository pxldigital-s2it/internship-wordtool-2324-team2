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
import axios from "axios";
import SubCategory from "../../types/SubCategory";
import STRING_RESOURCES from "../../components/buttons/Strings";


export const openCreateCategoryModal = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setTitle(STRING_RESOURCES.buttons.add.label));
      dispatch(setCreate(true));
      dispatch(setCategory({ code: "", colour: "", id: "", title: "" }));
      dispatch(setOpen(true));
    } catch (e) {
      // TODO: Toast to notify user smth went wrong.
      console.error(e.message);
    }
  };
};

export const openCreateSubCategoryModal = (categoryId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<Category[]>(`http://localhost:3001/categories?id=${categoryId}`);
      if (response.data.length) {
        const category = response.data[0];
        dispatch(setTitle(categoryContextMenu.getSubCategoryLabel()));
        dispatch(setCreate(true));
        dispatch(setCategory(category));
        const subCategory: SubCategory = {
          categoryId: category.id
        };
        dispatch(setSubCategory(subCategory));
        dispatch(setOpen(true));
      } else {
        throw new Error("Geen unieke categorie kunnen vinden.");
      }
    } catch (e) {
      // TODO: Toast to notify user smth went wrong.
      console.error(e.message);
    }
  };
};

export const openUpdateSubCategoryModal = (subCategoryId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<SubCategory[]>(`http://localhost:3001/subCategories?id=${subCategoryId}`);
      if (response.data.length) {
        const subCategory = response.data[0];
        const categoryResponse = await axios.get<Category[]>(`http://localhost:3001/categories?id=${subCategory.categoryId}`);
        if (categoryResponse.data.length) {
          const category = categoryResponse.data[0];
          dispatch(setTitle(categoryContextMenu.getEditLabel()));
          dispatch(setCreate(false));
          dispatch(setCategory(category));
          dispatch(setSubCategory(subCategory));
          dispatch(setOpen(true));
        } else {
          throw new Error("Geen unieke categorie kunnen vinden.");
        }
      } else {
        throw new Error("Geen unieke subcategorie kunnen vinden.");
      }
    } catch (e) {
      // TODO: Toast to notify user smth went wrong.
      console.error(e.message);
    }
  };
};

const closeModal = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setOpen(false));
    dispatch(setSubCategory(undefined));
    dispatch(setTitle(""));
    dispatch(setCategory(undefined));
  };
};

export const saveSubCategory = (subCategory: SubCategory) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.post<SubCategory>("http://localhost:3001/subCategories", subCategory);
      dispatch(closeModal());
    } catch (e) {
      // TODO: Toast to notify user smth went wrong.
      console.error(e.message);
    }
  };
};

export const updateSubCategory = (id: string, subCategory: SubCategory) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.put<SubCategory>(`http://localhost:3001/subCategories/${id}`, subCategory);
      dispatch(closeModal());
    } catch (e) {
      // TODO: Toast to notify user smth went wrong.
      console.error(e.message);
    }
  };
};
