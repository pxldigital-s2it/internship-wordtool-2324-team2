import * as React from 'react';
import { useState } from 'react';
import Section from './Section';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IconButton } from '@fluentui/react/lib/Button';

// styles for category components
const categoryClassNames = mergeStyleSets({
  categoryHeader: {
    backgroundColor: '#eff6fc', // light blue background
    fontSize: '16px',
    fontWeight: '600',
    color: '#005a9e', // Word's blue color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: '10px 20px',
    borderBottom: '1px solid #cccccc', // light grey border
  },
  categoryContent: {
    padding: '10px 20px',
  },
  arrowIcon: {
    fontSize: '12px',
    color: '#005a9e', // Word's blue color
  },
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
