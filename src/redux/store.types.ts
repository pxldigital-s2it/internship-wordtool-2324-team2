import { ModalState } from "./modal/modal.types";
import { CategoryState } from "./category/category.types";

export interface State {
  category: CategoryState
  modal: ModalState
}
