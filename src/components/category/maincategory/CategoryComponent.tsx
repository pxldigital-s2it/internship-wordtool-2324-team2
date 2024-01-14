import * as React from 'react';
import { useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import SubCategoryComponent from "../subcategory/SubCategoryComponent";
import Category from '../../../types/Category';
import { categoryClassNames } from './CategoryComponent.styles';
import { ContextMenu } from "../../index";

const CategoryComponent: React.FC<Category> = ({ id, title, colour, subCategories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ContextMenu trigger={
        <div
          id={`${id}`}
          className={categoryClassNames.categoryHeader}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconButton
            iconProps={{ iconName: isOpen ? 'ChevronDown' : 'ChevronRight' }}
            className={categoryClassNames.arrowIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          {title} {subCategories && subCategories.length > 0 && `(${subCategories.length})`}
          <div
            className={categoryClassNames.colorSquare}
            style={{ backgroundColor: colour }}
          />
        </div>
      }
       menuItems={
         [
           {
             handler: () => {
               console.log(`Edit category ${id}`);
             },
             label: "Bewerken"
           },
           {
             handler: () => {
               console.log(`Delete category ${id}`);
             },
             label: "Verwijderen"
           }
         ]
       }
      />
      {isOpen && (
        <div className={categoryClassNames.categoryContent}>
          {subCategories && subCategories.map((subCategory) => (
            <SubCategoryComponent key={subCategory.id} {...subCategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;