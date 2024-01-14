import SubCategory from "./SubCategory";

interface Category {
  code: Nullable<string>
  colour?: string
  id?: string
  subCategories?: SubCategory[]
  title?: string
}

export default Category;
