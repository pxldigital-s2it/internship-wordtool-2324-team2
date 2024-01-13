import FieldType from "./FieldType";

interface SubCategory {
  id?: string;
  categoryId: string;
  description?: string;
}

export interface DisplayableSubCategory {
  content: string;
  id: string;
  label: string;
  type: FieldType;
}

export default SubCategory;
