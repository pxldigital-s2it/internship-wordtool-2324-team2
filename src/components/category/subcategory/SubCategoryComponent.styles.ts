import { mergeStyleSets } from "@fluentui/react";

export const sectionClassNames = mergeStyleSets({
  section: {
    borderBottom: "1px solid #e1dfdd", // light border for separation
    cursor: "pointer",
    padding: "5px 0",
    selectors: {
      ":hover": {
        backgroundColor: "#eaeaea", // slight background color change on hover
        fontWeight: "bold" // bold font on hover
      },
      ":last-child": {
        borderBottom: "none" // no border for the last item
      }
    },
    userSelect: "none"
  },
  sectionText: {
    color: '#323130', // using a color from the Fluent UI neutral palette
    fontSize: '14px',
    padding: '4px 0', // slight padding for the text
    paddingLeft: '20px'
  }
});
