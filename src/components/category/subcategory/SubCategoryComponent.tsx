'use client';

import * as React from 'react';
import { sectionClassNames } from './SubCategoryComponent.styles';
import SubCategory from "../../../types/SubCategory";
import { openUpdateSubCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import { useAppDispatch } from "../../../redux/hooks";
import { categoryContextMenu } from "../../../patterns/observer";
import { ContextMenu } from "../../index";

// component representing a single section
const SubCategoryComponent: React.FC<SubCategory> = ({ id, categoryId, description }) => {
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      handler: () => dispatch(openUpdateSubCategoryModal("sub_category_1_1")),
      label: categoryContextMenu.getEditLabel()
    },
    {
      handler: () => console.log("Verwijderen"),
      label: categoryContextMenu.getDeleteLabel()
    }
  ];

  return (
    <div id={`cat_${categoryId}_sub_${id}`} className={sectionClassNames.section}>
      <ContextMenu trigger={
        <span className={sectionClassNames.sectionText}>
          {description}
        </span>
      }
      menuItems={menuItems} />
    </div>
  );
};

export default SubCategoryComponent;