import { sectionClassNames } from "../subcategory/SubCategoryComponent.styles";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
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

    return (
        <table className={sectionClassNames.subSubCategoryTable}>
            <tbody>
            {
                isAddingSubSubCategory &&
                <AddSubSubCategoryComponent
                    backgroundColor={backgroundColor}
                    setIsAddingSubSubCategory={setIsAddingSubSubCategory}
                    subCategoryId={subCategoryId}
                />
            }

            {subSubCategories.map((subSubCategory) =>
                (<SubSubCategoryRow subSubCategory={subSubCategory}
                                    key={subSubCategory.id}
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