import { ModalState } from "./modal/modal.types";
import { CategoryState } from "./category/category.types";
import { ContrastWarningAlertState } from "./contrastwarningalert/contrastwarningalert.types";
import { SettingsState } from "./settings/settings.types";

export interface State {
  category: CategoryState
  contrastWarningAlert: ContrastWarningAlertState
  modal: ModalState
  settings: SettingsState
}
