import * as React from 'react';
import { sectionClassNames } from './Section.styles';
import {ContextMenu} from "../../index";
import {runOpenUpdateSubCategoryModal} from "../../../middleware/modal/ModalMiddleware";
import {categoryContextMenu} from "../../../patterns/observer";
import {useAppDispatch} from "../../../redux/hooks";

// component representing a single section
const Section: React.FC = () => {
    const dispatch = useAppDispatch();

    const exampleContextMenuItems = [
        {
            handler: () => dispatch(runOpenUpdateSubCategoryModal("sub_category_1")),
            label: categoryContextMenu.getEditLabel()
        },
        {
            handler: () => console.log("Verwijderen"),
            label: categoryContextMenu.getDeleteLabel()
        }
    ];

  return (
    <div className={sectionClassNames.section}>
        <ContextMenu trigger={<span className={sectionClassNames.sectionText}>Section Content</span>} menuItems={exampleContextMenuItems} />
    </div>
  );
};

export default Section;
