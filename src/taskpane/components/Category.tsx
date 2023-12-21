import * as React from 'react';
import { useState } from 'react';
import Section from './Section';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IconButton } from '@fluentui/react/lib/Button';

// styles for category components
const categoryClassNames = mergeStyleSets({
    categoryHeader: {
    backgroundColor: '#eff6fc',
    fontSize: '16px',
    fontWeight: '600',
    color: '#005a9e',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px 20px',
    borderBottom: '1px solid #cccccc',
  },
  categoryTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  arrowIcon: {
    fontSize: '12px',
    color: '#005a9e',
    marginRight: 10,
  },
  categoryContent: {
    padding: '10px 20px',
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
          iconProps={{ iconName: isOpen ? 'ChevronDown' : 'ChevronRight' }}
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
