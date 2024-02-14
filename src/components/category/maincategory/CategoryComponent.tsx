import * as React from "react";
import { useState } from "react";
import SubCategoryComponent from "../subcategory/SubCategoryComponent";
import { categoryClassNames } from "./CategoryComponent.styles";
import { ContextMenu } from "../../index";
import CategoryHeader from "./CategoryHeader";
import { openCreateSubCategoryModal, openUpdateCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import { categoryContextMenu } from "../../../patterns/observer";
import { useAppDispatch } from "../../../redux/hooks";
import Category from "../../../types/Category";
import { deleteCategory } from "../../../middleware/category/CategoryMiddleware";

const CategoryComponent: React.FC<Category> = ({ id, title, colour, subCategories, code }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <div>
            <ContextMenu trigger={<CategoryHeader colour={colour} id={id} isOpen={isOpen} setIsOpen={setIsOpen}
                                                  sections={subCategories.length} name={`[${code}] ${title}`}/>}
               menuItems={
                   [
                     {
                       handler: () => dispatch(openCreateSubCategoryModal({ code, colour, id, subCategories, title })),
                       label: categoryContextMenu.getSubCategoryLabel()
                     },
                     {
                       handler: () => dispatch(openUpdateCategoryModal({ code, colour, id, subCategories, title })),
                       label: categoryContextMenu.getEditLabel()
                     },
                       {
                           handler: () => dispatch(deleteCategory(id)),
                           label: categoryContextMenu.getDeleteLabel()
                       }
                   ]
               }
            />
            {isOpen && (
                <div className={categoryClassNames.categoryContent}>
                    {subCategories && subCategories.map((subCategory) => (
                        <SubCategoryComponent key={subCategory.id} {...subCategory} backgroundColor={colour}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryComponent;
