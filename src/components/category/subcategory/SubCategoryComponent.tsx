import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import SubCategory from "../../../types/SubCategory";
import { deleteSubCategory } from "../../../middleware/category/CategoryMiddleware";
import { openUpdateSubCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import insertAndHighlightText from "../../../taskpane/office-document";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { Icon } from "@fluentui/react";
import { ContextMenu } from "../../index";
import * as React from "react";
import { categoryContextMenu } from "../../../patterns/observer";

const SubCategoryComponent: React.FC<SubCategory> = ({ id, categoryId, description, isFavorite: initialIsFavorite, backgroundColor }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();

  const toggleFavorite = useCallback(() => setIsFavorite((fav) => !fav), []);

  const handleDelete = useCallback(() => {
    dispatch(deleteSubCategory(id));
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    dispatch(openUpdateSubCategoryModal({ categoryId, description, id, isFavorite }));
  }, [dispatch, categoryId, description, id, isFavorite]);

  const handleTextInsertion = useCallback(async () => {
    await insertAndHighlightText(categoryId, description);
  }, [categoryId, description]);


  const menuItems = [
    {
      handler: () => dispatch(openUpdateSubCategoryModal({ categoryId, description, id, isFavorite })),
      label: categoryContextMenu.getEditLabel()
    },
    {
      handler: () => dispatch(deleteSubCategory(id)),
      label: categoryContextMenu.getDeleteLabel()
    }
  ];

  return (
    <tr onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={sectionClassNames.section}>
      <td style={{ paddingRight: '6px' }}>
        <div style={{ backgroundColor: backgroundColor, visibility: isHovered ? "visible" : "hidden" }} className={sectionClassNames.activeRowColorBlock}>&nbsp;</div>
      </td>
      <td onClick={toggleFavorite} title={isFavorite ? "Verwijderen als Favoriet" : "Toevoegen als Favoriet"}>
        <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"} className={`${sectionClassNames.menuIcon} ${isFavorite && 'isFavorite'} ${isHovered && 'showIcon'}`} />
      </td>
      <td onClick={handleEdit}>
        <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isHovered && 'showIcon'}`} title="Wijzigen" />
      </td>
      <td onClick={handleTextInsertion} style={{ width: '100%', transition: "opacity 0.5s ease-in-out" }} className={sectionClassNames.sectionText}>
        {description}
      </td>
      <td onClick={handleDelete}>
        <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isHovered && 'showIcon'}`} title="Verwijderen" />
      </td>
      <td>
        <ContextMenu trigger={<Icon iconName="More" className={`${sectionClassNames.menuIcon} ${sectionClassNames.contextMenuIcon} ${isHovered && 'showIcon'}`} />} menuItems={menuItems} />
      </td>
    </tr>
  );
};

export default SubCategoryComponent;