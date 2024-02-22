import {MutableRefObject, useState} from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCategory, selectCreate, selectSubCategory } from "../redux/modal/modal.slice";
import { saveCategory, saveSubCategory, updateCategory, updateSubCategory } from "../middleware/modal/ModalMiddleware";
import { readFormField } from "../forms/utils/FormUtils";
import { isCategory, isSubCategory } from "../types/IsType";
import { selectColour } from "../redux/category/category.slice";
import { isLowContrast } from "../utils/ContrastUtils";
import { getColorObject } from "../utils/ColorUtils";
import { ContrastWarning } from "../components/colourpicker/ContrastWarning";


const useCategory = (setShowDialog) => {

    const dispatch = useAppDispatch();

    const category = useAppSelector(selectCategory);
    const colour = useAppSelector(selectColour);
    const create = useAppSelector(selectCreate);
    const subCategory = useAppSelector(selectSubCategory);

    const data = subCategory ? subCategory : category;

    const handleSubmit = async (formRef: MutableRefObject<HTMLFormElement>) => {
        const colorObject = getColorObject(colour);
        if (isLowContrast(colorObject)) {
          setShowDialog(true);
          return;
        }
      await saveData(formRef);
    };
    
    const saveData = async (formRef: MutableRefObject<HTMLFormElement>) => {
        if (isCategory(data)) {
            const category = {
                code: readFormField(formRef, "code"),
                colour,
                title: readFormField(formRef, "title")
            }
            if (create) {
                dispatch(saveCategory(category));
            } else {
                dispatch(updateCategory(data.id, category));
            }
        }
        if (isSubCategory(data)) {
            const subCategory = {
                categoryId: data.categoryId,
                description: readFormField(formRef, "description"),
                isFavorite: false
            };
            if (create) {
                dispatch(saveSubCategory(subCategory));
            } else {
                dispatch(updateSubCategory(data.id, subCategory));
            }
        }
    };

    return {categoryTitle: category?.title, data, handleSubmit, saveData };
}

export default useCategory;
