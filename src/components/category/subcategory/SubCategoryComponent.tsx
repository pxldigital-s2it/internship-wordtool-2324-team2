import * as React from 'react';
import {sectionClassNames} from './SubCategoryComponent.styles';
import {openUpdateSubCategoryModal} from "../../../middleware/modal/ModalMiddleware";
import {useAppDispatch} from "../../../redux/hooks";
import {categoryContextMenu} from "../../../patterns/observer";
import {ContextMenu} from "../../index";
import insertText from "../../../taskpane/office-document";
import {FC} from "react";
import {deleteSubCategory} from "../../../middleware/category/CategoryMiddleware";
import SubCategory from "../../../types/SubCategory";


// component representing a single section
const SubCategoryComponent: FC<SubCategory> = ({id, categoryId, description}) => {
    const dispatch = useAppDispatch();

    const menuItems = [
        {
            handler: () => dispatch(openUpdateSubCategoryModal({ categoryId, description, id })),
            label: categoryContextMenu.getEditLabel()
        },
        {
            handler: () => dispatch(deleteSubCategory(id)),
            label: categoryContextMenu.getDeleteLabel()
        }
    ];

    const handleTextInsertion = async (categoryId: string, description: string) => {
        await insertText(categoryId, description);
    }

    return (
        <div id={`cat_${categoryId}_sub_${id}`} className={sectionClassNames.section}>
            <ContextMenu trigger={
                <span className={sectionClassNames.sectionText}
                      onClick={() => handleTextInsertion(categoryId, description)}>
          {description}
        </span> } menuItems={menuItems}/>
        </div>
    );
};

export default SubCategoryComponent;
