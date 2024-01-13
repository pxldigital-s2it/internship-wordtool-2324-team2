import Category from "./Category";
import SubCategory from "./SubCategory";

export const isCategory = (category: Category | SubCategory): category is Category => category &&  "colour" in category;
export const isSubCategory = (category: Category | SubCategory): category is SubCategory => category && "categoryId" in category;
