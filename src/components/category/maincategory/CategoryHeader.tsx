import { categoryClassNames } from "./CategoryComponent.styles";
import { IconButton } from "@fluentui/react/lib/Button";
import * as React from "react";
import { CategoryHeaderProps } from "./CategoryHeader.types";
import { FC } from "react";


const CategoryHeader: FC<CategoryHeaderProps> = ({ colour, id, code, isOpen, name, setIsOpen, sections }) => {

  return (
      <div
      id={`category-${id}`}
      className={categoryClassNames.categoryHeader}
      onClick={() => setIsOpen(!isOpen)}
    >
        {id != 'favorites' ? <div
          className={categoryClassNames.colorSquare}
          style={{
            backgroundColor: colour,
            color: "black",
            fontFamily: "monospace",
            paddingTop: "2px",
            textAlign: "center"
          }}>
            {code}
        </div> : ""}
        <IconButton
          iconProps={{ iconName: isOpen ? "ChevronDown" : "ChevronRight" }}
        className={categoryClassNames.arrowIcon}
        onClick={() => setIsOpen(!isOpen)}
      />
      {name} {sections && sections > 0 ? `(${sections})` : ""}
    </div>);
}

export default CategoryHeader;
