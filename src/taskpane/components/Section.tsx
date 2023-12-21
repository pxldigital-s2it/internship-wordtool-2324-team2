import * as React from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

// styles for each section within a category
const sectionClassNames = mergeStyleSets({
  section: {
    borderBottom: "1px solid #e1dfdd", // light border for separation
    padding: "5px 0",
    selectors: {
      ":last-child": {
        borderBottom: "none" // no border for the last item
      }
    }
  },
  sectionText: {
    color: "#323130", // using a color from the Fluent UI neutral palette
    fontSize: "14px",
    padding: "4px 0" // slight padding for the text
  }
});

// component representing a single section
const Section: React.FC = () => {
  return (
    <div className={sectionClassNames.section}>
      <span className={sectionClassNames.sectionText}>Section Content</span>
    </div>
  );
};

export default Section;
