import ContextMenuData from "./ContextMenuData";
import LabelKey from "../../types/LabelKey";
import CategoryContextMenu from "./CategoryContextMenu";
import SubCategoryContextMenu from "./SubCategoryContextMenu";


const contextMenuData = new ContextMenuData();
const categoryContextMenu = new CategoryContextMenu(contextMenuData);
const subCategoryContextMenu = new SubCategoryContextMenu(contextMenuData);
contextMenuData.setLabels(new Map<LabelKey, string>([
  [LabelKey.SUB_CAT, "Subcategorie toevoegen"],
  [LabelKey.FAVORITE, "Favoriet maken"],
  [LabelKey.EDIT, "Wijzigen"],
  [LabelKey.DELETE, "Verwijderen"]
]));
contextMenuData.labelsChanged();

export { contextMenuData, categoryContextMenu, subCategoryContextMenu };
