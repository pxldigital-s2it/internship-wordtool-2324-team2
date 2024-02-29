import { categoryClassNames } from "./CategoryComponent.styles";
import { IconButton } from "@fluentui/react/lib/Button";
import * as React from "react";
import { CategoryHeaderProps } from "./CategoryHeader.types";
import { FC } from "react";
import { sectionClassNames } from "../subcategory/SubCategoryComponent.styles";


const CategoryHeader: FC<CategoryHeaderProps> = ({ colour, id, code, isOpen, name, setIsOpen, sections }) => {

  return (
    <div
      id={`category-${id}`}
      className={categoryClassNames.categoryHeader}
      onClick={() => setIsOpen(!isOpen)}
      style={{
        fontWeight: 500,
        height: "24px",
        width: "100%"
      }}
    >
      {id != "favorites" ? <div
        className={categoryClassNames.colorSquare}
        style={{
          backgroundColor: colour,
          color: "black",
          fontFamily: "Consolas",
          fontSize: "12px",
          fontWeight: 200,
          textAlign: "center"
        }}>
        {code}
      </div> : ""}
      <IconButton
        iconProps={{ iconName: isOpen ? "ChevronDown" : "ChevronRight" }}
        className={categoryClassNames.arrowIcon}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={sectionClassNames.sectionTextHeader}>
        <div className={sectionClassNames.descriptionTextContainerDiv}>
          <div className={sectionClassNames.descriptionTextDiv} title={`${name} ` + `${sections && sections > 0 ? `(${sections})` : ""}`}>
            {name} {sections && sections > 0 ? `(${sections})` : ""}
          </div>
        </div>
      </div>
</div>)
  ;
}

export default CategoryHeader;
