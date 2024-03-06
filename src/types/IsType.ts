import Category from "./Category";
import SubCategory from "./SubCategory";
import SubSubCategory from "./SubSubCategory";

export const isCategory = (category: Category | SubCategory | SubSubCategory): category is Category => category && "code" in category;
export const isSubCategory = (category: Category | SubCategory | SubSubCategory): category is SubCategory => category && "categoryId" in category;
export const isSubSubCategory = (category: Category | SubCategory | SubSubCategory): category is SubSubCategory => category && "subCategoryId" in category;