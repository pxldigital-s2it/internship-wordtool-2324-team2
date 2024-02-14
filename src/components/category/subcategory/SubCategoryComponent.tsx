import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import SubCategory from "../../../types/SubCategory";
import {
  deleteSubCategory,
  getCategoryDataById,
  updateSubCategoryIsFavorite
} from "../../../middleware/category/CategoryMiddleware";
import { openUpdateSubCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import insertAndHighlightText from "../../../taskpane/office-document";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { Icon } from "@fluentui/react";
import { ContextMenu } from "../../index";
import * as React from "react";
import { categoryContextMenu } from "../../../patterns/observer";

const SubCategoryComponent: React.FC<SubCategory> = ({ id, categoryId, description, isFavorite, backgroundColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({ code: '', colour: '' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFavorite) {
      dispatch(getCategoryDataById(categoryId)).then(data => {
        if (data) {
          setCategoryDetails({ code: data.code, colour: data.colour });
        }
      });
    }
  }, [dispatch, categoryId, isFavorite]);

  const toggleFavorite = useCallback(() => {
    dispatch(updateSubCategoryIsFavorite(id, !isFavorite));
  }, [dispatch, id, isFavorite]);


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
    <tr onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        className={sectionClassNames.section}>
      <td style={{ paddingRight: '6px' }}>
        <div style={{ width: "16px" }}>
          <div style={{
            backgroundColor: categoryDetails.colour || backgroundColor,
            height: isHovered ? "36px" : "32px",
            width: isHovered ? "16px" : "1px"
          }} className={sectionClassNames.activeRowColorBlock}>&nbsp;</div>
        </div>
      </td>
      <td onClick={toggleFavorite} title={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}>
        <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
              className={`${sectionClassNames.menuIcon} ${isFavorite && 'isFavorite'} ${isHovered && 'showIcon'}`} />
      </td>
      <td onClick={handleEdit}>
        <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isHovered && 'showIcon'}`} title="Wijzigen" />
      </td>
      <td onClick={handleTextInsertion} style={{ transition: "opacity 0.5s ease-in-out", width: "100%" }}
          className={sectionClassNames.sectionText}>
        {description}
      </td>
      <td onClick={handleDelete}>
        <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isHovered && 'showIcon'}`}
              title="Verwijderen" />
      </td>
      <td>
        <ContextMenu trigger={<Icon title={"Meer bekijken"} iconName="More"
                                    className={`${sectionClassNames.menuIcon} ${sectionClassNames.contextMenuIcon} ${isHovered && 'showIcon'}`} />}
                     menuItems={menuItems} />
      </td>
    </tr>
  );
};

export default SubCategoryComponent;