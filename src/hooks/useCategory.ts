import { MutableRefObject } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCategory, selectCreate, selectSubCategory } from "../redux/modal/modal.slice";
import { saveSubCategory, updateSubCategory } from "../middleware/modal/ModalMiddleware";
import { readFormField } from "../forms/utils/FormUtils";

import { isCategory, isSubCategory } from "../types/IsType";


const useCategory = () => {

  const dispatch = useAppDispatch();

  const create = useAppSelector(selectCreate);
  const category = useAppSelector(selectCategory);
  const subCategory = useAppSelector(selectSubCategory);

  const data = subCategory ? subCategory : category;

  const handleSubmit = async (formRef: MutableRefObject<HTMLFormElement>) => {
    if (isCategory(data)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const category = {
        code: readFormField(formRef, "code"),
        title: readFormField(formRef, "title")
      }
      if (create) {
        // dispatch(saveCategory(category));
      } else {
        // dispatch(updateCategory(data.id, category));
      }
    }
    if (isSubCategory(data)) {
      const subCategory = {
        categoryId: data.categoryId,
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
