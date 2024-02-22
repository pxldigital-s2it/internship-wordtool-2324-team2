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
import FreeFeedbackInput from "../../freefeedbackinput/FreeFeedbackInput";

const CategoryComponent: React.FC<Category> = ({ id, title, colour, subCategories, code }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <table style={{
      backgroundColor: colour + "1A",
      tableLayout: "fixed",
      width: "100%"
    }}>
      <thead>
      <tr>
        <ContextMenu trigger={<CategoryHeader colour={colour} id={id} code={code} isOpen={isOpen} setIsOpen={setIsOpen}
                                              sections={subCategories.length}
                                              name={id == "favorites" ? `${code} ${title}` : `${title}`} />}
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
      </thead>
      <tbody>
      {isOpen && (
          <tr className={categoryClassNames.categoryContent}>
            {subCategories && subCategories.length > 0 ? (
                subCategories.map((subCategory, index) => (
                    <SubCategoryComponent key={subCategory.id} {...subCategory} backgroundColor={colour} shortCode={(index + 1).toString()} />
                ))
            ) : (
                <FreeFeedbackInput categoryId={id} description={title} shortCode={code} />
            )}
          </tr>
      )}
      </tbody>
    </table>
  );
};

export default CategoryComponent;
