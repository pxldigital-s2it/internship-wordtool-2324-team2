import { mergeStyleSets } from "@fluentui/react";

export const sectionClassNames = mergeStyleSets({
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
    color: '#323130', // using a color from the Fluent UI neutral palette
    fontSize: '14px',
    padding: '4px 0' // slight padding for the text
  }
});
