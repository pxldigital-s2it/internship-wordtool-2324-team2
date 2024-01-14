import SubCategory from "./SubCategory";

interface Category {
  id: string
  title: string
  code?: Nullable<string>
  colour?: string,
  subCategories?: SubCategory[]
}

export default Category;
