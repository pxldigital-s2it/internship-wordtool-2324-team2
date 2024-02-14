import { mergeStyleSets } from "@fluentui/react";

export const sectionClassNames = mergeStyleSets({
  contextMenuIcon: {
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 8px"
  },
  favoriteIcon: {
    color: "rgb(50, 49, 48)",
    fontSize: "14px",
    height: "24px",
    lineHeight: "24px",
    margin: "0 auto",
    padding: "4px",
    selectors: {
      "&.isFavorite": {
        color: "red"
      },
      ":hover": {
        boxShadow: "red 0px 0px 1px 0px",
        color: "red"
        // transform: "scale(1.2)",
      }
    },
    textAlign: "center",
    transition: "color 0.3s ease-in-out, transform 0.3s ease",
    verticalAlign: "middle"
  },
  section: {
    borderBottom: "1px solid #e1dfdd", // light border for separation
    cursor: "pointer",
    padding: "5px 0",
    selectors: {
      ":hover": {
        backgroundColor: "#eaeaea"
      },
      ":last-child": {
        borderBottom: "none" // no border for the last item
      }
    },
    userSelect: "none"
  },
  sectionIcon: {
    color: "#323130",
    fontSize: "14px",
    padding: "4px 0", // slight padding for the text
    paddingLeft: "20px"
  },
  sectionText: {
    color: "#323130", // using a color from the Fluent UI neutral palette
    fontSize: "14px",
    padding: "4px 0", // slight padding for the text
    paddingLeft: "20px"
  }
});
