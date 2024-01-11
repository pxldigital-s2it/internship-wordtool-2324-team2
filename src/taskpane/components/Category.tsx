import * as React from "react";
import { useState } from "react";
import Section from "./Section";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { IconButton } from "@fluentui/react/lib/Button";

// styles for category components
const categoryClassNames = mergeStyleSets({
  arrowIcon: {
    color: "#005a9e",
    fontSize: "12px",
    marginRight: 10
  },
  categoryContent: {
    padding: "10px 20px"
  },
  categoryHeader: {
    alignItems: "center",
    backgroundColor: "#eff6fc",
    borderBottom: "1px solid #cccccc",
    color: "#005a9e",
    cursor: "pointer",
    display: "flex",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px 20px"
  },
  categoryTitle: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-start"
  }
});

// category component with expandable/collapsible sections
interface CategoryProps {
  name: string;
  sections: number;
}

const Category: React.FC<CategoryProps> = ({ name, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={categoryClassNames.categoryHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconButton
          iconProps={{ iconName: isOpen ? "ChevronDown" : "ChevronRight" }}
          className={categoryClassNames.arrowIcon}
          onClick={() => setIsOpen(!isOpen)}
        />
        {name} ({sections})
      </div>
      {isOpen && (
        <div className={categoryClassNames.categoryContent}>
          {[...Array(sections)].map((_, index) => (
            <Section key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
