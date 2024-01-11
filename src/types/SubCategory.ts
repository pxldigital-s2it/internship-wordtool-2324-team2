import FieldType from "./FieldType";

interface SubCategory {
  id?: string;
  categoryId: string;
  description?: string;
  code: Nullable<string>;
}

export interface DisplayableSubCategory {
  content: string;
  id: string;
  label: string;
  type: FieldType;
}

export default SubCategory;