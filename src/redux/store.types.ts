import { ModalState } from "./modal/modal.types";
import { CategoryState } from "./category/category.types";
import { SettingsState } from "./settings/settings.types";

export interface State {
  category: CategoryState
  modal: ModalState,
  settings: SettingsState
}
