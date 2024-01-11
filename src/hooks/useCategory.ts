import { MutableRefObject } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCategory, selectCreate, selectSubCategory } from "../redux/modal/modal.slice";
import { saveSubCategory, updateSubCategory } from "../middleware/modal/ModalMiddleware";
import { readFormField } from "../forms/utils/FormUtils";

import { isSubCategory } from "../types/IsType";


const useCategory = () => {

  const dispatch = useAppDispatch();

  const create = useAppSelector(selectCreate);
  const category = useAppSelector(selectCategory);
  const subCategory = useAppSelector(selectSubCategory);

  const data = subCategory ? subCategory : category;

  const handleSubmit = async (formRef: MutableRefObject<HTMLFormElement>) => {
    if (isSubCategory(data)) {
      const subCategory = {
        categoryId: data.categoryId,
        code: readFormField(formRef, "code"),
        description: readFormField(formRef, "description")
      };
      if (create) {
        dispatch(saveSubCategory(subCategory));
      } else {
        dispatch(updateSubCategory(data.id, subCategory));
      }
    }
  };

  return { categoryTitle: category?.title, data, handleSubmit };
};

export default useCategory;
