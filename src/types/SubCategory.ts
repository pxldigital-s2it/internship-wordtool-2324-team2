import SubSubCategory from "./SubSubCategory";

interface SubCategory {
  categoryId: string;
  description: Nullable<string>;
  id?: string;
  isFavorite: boolean;
  backgroundColor?: Nullable<string>;
  shortCode?: string;
  subSubCategories?: SubSubCategory[];
  url?: string;
}

export default SubCategory;
