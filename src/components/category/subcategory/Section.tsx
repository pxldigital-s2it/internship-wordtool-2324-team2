import * as React from 'react';
import { sectionClassNames } from './Section.styles';

// component representing a single section
const Section: React.FC = () => {
  return (
    <div className={sectionClassNames.section}>
      <span className={sectionClassNames.sectionText}>Section Content</span>
    </div>
  );
};

export default Section;
