import * as React from "react";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { openUpdateSubCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import { useAppDispatch } from "../../../redux/hooks";
import { categoryContextMenu } from "../../../patterns/observer";
import { ContextMenu } from "../../index";
import insertAndHighlightText from "../../../taskpane/office-document";
import { FC } from "react";
import { deleteSubCategory } from "../../../middleware/category/CategoryMiddleware";
import SubCategory from "../../../types/SubCategory";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";

// component representing a single section
const SubCategoryComponent: FC<SubCategory> = ({ id, categoryId, description, isFavorite: initialIsFavorite, color }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  // TODO: Update isFavorite in backend
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDelete = () => {
    dispatch(deleteSubCategory(id))
  };

  const handleEdit = () => {
    dispatch(openUpdateSubCategoryModal({ categoryId, description, id, isFavorite }))
  };

  useEffect(() => {

  }, [isFavorite]);

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

  const handleTextInsertion = async (categoryId: string, description: string) => {
    await insertAndHighlightText(categoryId, description);
  };

  return (
    <tr id={`cat_${categoryId}_sub_${id}`} className={sectionClassNames.section}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
      <td style={{ paddingRight: '6px' }}><div className={sectionClassNames.activeRowColorBlock} style={{
        backgroundColor: color,
        visibility: isHovered ? "visible" : "hidden"
      }}>&nbsp;</div></td>
      <td onClick={toggleFavorite} title={isFavorite ? "Verwijderen als Favoriet" : "Toevoegen als Favoriet"}>
        <span
              className={`${sectionClassNames.menuIcon} ${isFavorite ? 'isFavorite' : ''} ${isFavorite || isHovered ? 'showIcon' : ''} `}>
          <Icon iconName={isFavorite || isHovered ? "FavoriteStarFill" : "FavoriteStar"} />
        </span>
      </td>
      <td onClick={handleEdit}>
        <span className={`${sectionClassNames.menuIcon} ${isHovered ? 'showIcon' : ''}`}>
          <Icon iconName="Edit" title="Wijzigen" />
        </span>
      </td>
      <td onClick={() => handleTextInsertion(categoryId, description)} style={{ width: '100%' }}
          className={sectionClassNames.sectionText}>
        {description}
      </td>
      <td onClick={handleDelete}>
        <span className={`${sectionClassNames.menuIcon} ${isHovered ? 'showIcon' : ''}`}>
          <Icon iconName="Delete" title="Verwijderen"  />
        </span>
      </td>
      <td>
        <ContextMenu
          trigger={
            <Icon iconName="More" className={`${sectionClassNames.menuIcon} ${sectionClassNames.contextMenuIcon} ${isHovered ? 'showIcon' : ''} `} />
          }
          menuItems={menuItems}
        />
      </td>
    </tr>
  );
};

export default SubCategoryComponent;
