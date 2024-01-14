import * as React from 'react';
import { sectionClassNames } from './SubCategoryComponent.styles';
import SubCategory from "../../../types/SubCategory";

// component representing a single section
const SubCategoryComponent: React.FC<SubCategory> = ({ id, categoryId, description }) => {
  return (
    <div id={`cat_${categoryId}_sub_${id}`} className={sectionClassNames.section}>
      <div>
        <span className={sectionClassNames.sectionText}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default SubCategoryComponent;