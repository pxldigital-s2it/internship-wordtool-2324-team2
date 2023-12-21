import * as React from 'react';
import { useState } from 'react';
import Section from './Section';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IconButton } from '@fluentui/react/lib/Button';

// styles for category components
const categoryClassNames = mergeStyleSets({
  arrowIcon: {
    color: "#005a9e", // Word's blue color
    fontSize: "12px"
  },
  categoryContent: {
    padding: "10px 20px"
  },
  categoryHeader: {
    alignItems: "center",
    backgroundColor: "#eff6fc", // light blue background
    borderBottom: "1px solid #cccccc", // light grey border
    color: "#005a9e", // Word's blue color
    cursor: "pointer",
    display: "flex",
    fontSize: "16px",
    fontWeight: "600",
    justifyContent: "space-between",
    padding: "10px 20px"
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
        {name} ({sections})
        <IconButton
          iconProps={{ iconName: isOpen ? 'ChevronUp' : 'ChevronDown' }}
          className={categoryClassNames.arrowIcon}
          onClick={() => setIsOpen(!isOpen)}
        />
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
