import * as React from 'react';
import { sectionClassNames } from './Section.styles';
import {ContextMenu} from "../../index";
import {openUpdateSubCategoryModal} from "../../../middleware/modal/ModalMiddleware";
import {categoryContextMenu} from "../../../patterns/observer";
import {useAppDispatch} from "../../../redux/hooks";

// component representing a single section
const Section: React.FC = () => {
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
    <div className={sectionClassNames.section}>
        <ContextMenu trigger={<span className={sectionClassNames.sectionText}>Section Content</span>} menuItems={menuItems} />
    </div>
  );
};

export default Section;
