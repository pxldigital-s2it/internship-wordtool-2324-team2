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
const SubCategoryComponent: FC<SubCategory> = ({ id, categoryId, description, isFavorite: initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  // TODO: Update isFavorite in backend
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
      <td>
        <span onClick={toggleFavorite} className={`${sectionClassNames.favoriteIcon} ${isFavorite ? 'isFavorite' : ''}`}
              style={{ cursor: 'pointer' }}>
          <Icon iconName={isFavorite || isHovered ? "FavoriteStarFill" : "FavoriteStar"} />
        </span>
      </td>
      <td onClick={() => handleTextInsertion(categoryId, description)} style={{ width: '100%' }}
          className={sectionClassNames.sectionText}>
        {description}
      </td>
      <td>
        <ContextMenu
          trigger={
            <Icon iconName="More" className={sectionClassNames.contextMenuIcon} />
          }
          menuItems={menuItems}
        />
      </td>
    </tr>
  );
};

export default SubCategoryComponent;
