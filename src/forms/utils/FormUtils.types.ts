import FieldType from "../../types/FieldType";

export interface DisplayableCategory {
  content: string;
  id?: string;
  label: string;
  type: FieldType;
}
