import { categoryClassNames } from "./CategoryComponent.styles";
import { IconButton } from "@fluentui/react/lib/Button";
import * as React from "react";
import { CategoryHeaderProps } from "./CategoryHeader.types";
import { FC } from "react";
import { getCategoryStyleName, getCategoryText, insertText } from "../../../utils/TextInsertUtils";


const CategoryHeader: FC<CategoryHeaderProps> = ({
                                                     alwaysInsertFullText,
                                                     colour,
                                                     id,
                                                     code,
                                                     isOpen,
                                                     name,
                                                     setIsOpen,
                                                     sections
                                                 }) => {
    const handleInsertClick = async () => {
        await getCategoryText(name, code, alwaysInsertFullText)
            .then((result) => getCategoryStyleName(id, colour)
                .then((categoryStyleName) => insertText(result, categoryStyleName)));
    }
    return (
        <div
            id={`category-${id}`}
            className={categoryClassNames.categoryHeader}
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
                }}
                onClick={handleInsertClick}
            >
                {code}
            </div> : ""}
            <IconButton
                iconProps={{ iconName: isOpen ? "ChevronDown" : "ChevronRight" }}
                className={categoryClassNames.arrowIcon}
                onClick={() => setIsOpen(!isOpen)}
            />
            <span onClick={() => setIsOpen(!isOpen)}>
          {name} {sections && sections > 0 ? `(${sections})` : ""}</span>
        </div>);
}

export default CategoryHeader;