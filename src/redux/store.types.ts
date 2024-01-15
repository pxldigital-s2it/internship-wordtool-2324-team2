import { ModalState } from "./modal/modal.types";
import { CategoryDataState } from './categoryData/categoryData.types';

export interface State {
  modal: ModalState;
  categoryData: CategoryDataState;
}