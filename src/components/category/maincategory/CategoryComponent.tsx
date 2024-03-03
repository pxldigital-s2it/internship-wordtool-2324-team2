import * as React from "react";
import { useState } from "react";
import SubCategoryComponent from "../subcategory/SubCategoryComponent";
import { categoryClassNames } from "./CategoryComponent.styles";
import { ContextMenu } from "../../index";
import CategoryHeader from "./CategoryHeader";
import { openCreateSubCategoryModal, openUpdateCategoryModal } from "../../../middleware/modal/ModalMiddleware";
import { categoryContextMenu } from "../../../patterns/observer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Category from "../../../types/Category";
import { deleteCategory } from "../../../middleware/category/CategoryMiddleware";
import FreeFeedbackInput from "../../freefeedbackinput/FreeFeedbackInput";
import { selectAlwaysInsertFullText } from "../../../redux/settings/settings.slice";

const CategoryComponent: React.FC<Category> = ({ id, title, colour, subCategories, code }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);

  return (
    <table style={{
      backgroundColor: colour + "1A",
      borderCollapse: "collapse",
      tableLayout: "fixed",
      width: "100%"
    }}>
      <thead>
      </thead>
      <tbody>
      <tr>
        <ContextMenu trigger={<CategoryHeader colour={colour} id={id} code={code} isOpen={isOpen} setIsOpen={setIsOpen}
                                              sections={subCategories.length}
                                              name={id == "favorites" ? `${code} ${title}` : `${title}`} alwaysInsertFullText={alwaysInsertFullText}/>}
                     menuItems={
                       [
                         {
                           handler: () => dispatch(openCreateSubCategoryModal({
                             code,
                             colour,
                             id,
                             subCategories,
                             title
                           })),
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
      </tr>
      {isOpen && (
          <tr className={categoryClassNames.categoryContent}>
            {subCategories && subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                    <SubCategoryComponent key={subCategory.id} {...subCategory} backgroundColor={colour} shortCode={subCategory.shortCode} />
                ))
            ) : (
                <FreeFeedbackInput categoryId={id} description={title} />
            )}
          </tr>
      )}
      </tbody>
    </table>
  );
};

export default CategoryComponent;
