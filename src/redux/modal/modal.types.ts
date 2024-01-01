import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";

export interface ModalState {
  category?: Category
  categoryId?: Category["id"]
  create: boolean
  open: boolean
  subCategory?: SubCategory
  title: string
}

