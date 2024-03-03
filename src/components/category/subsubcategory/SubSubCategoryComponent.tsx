import { sectionClassNames } from "../subcategory/SubCategoryComponent.styles";
import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import AddSubSubCategoryComponent from "./AddSubSubCategoryComponent";
import SubSubCategory from "../../../types/SubSubCategory";
import SubSubCategoryRow from "./SubSubCategoryRow";

const SubSubCategoryComponent: React.FC<{
  subCategoryId: string,
  subSubCategories: SubSubCategory[],
  isAddingSubSubCategory: boolean
  backgroundColor: string
  setIsAddingSubSubCategory: Dispatch<SetStateAction<boolean>>
  categoryId: string
  description: string
  shortCode: string
}> = ({
        subCategoryId,
        subSubCategories,
        isAddingSubSubCategory,
        backgroundColor,
        setIsAddingSubSubCategory,
        categoryId,
        description,
        shortCode
      }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <table className={sectionClassNames.subSubCategoryTable}>
      <tbody>
      {
        isAddingSubSubCategory &&
        <AddSubSubCategoryComponent
          setIsHovered={setIsHovered}
          backgroundColor={backgroundColor}
          setIsAddingSubSubCategory={setIsAddingSubSubCategory}
          subCategoryId={subCategoryId}
        />
      }

      {subSubCategories.map((subSubCategory) =>
        (<SubSubCategoryRow subSubCategory={subSubCategory}
                            key={subSubCategory.id}
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                            backgroundColor={backgroundColor}
                            shortCode={shortCode}
                            categoryId={categoryId}
                            description={description}
          />
        ))}
      </tbody>
    </table>);
};


export default SubSubCategoryComponent;
