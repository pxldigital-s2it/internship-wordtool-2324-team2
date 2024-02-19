import { mergeStyleSets } from "@fluentui/react";

export const sectionClassNames = mergeStyleSets({
  activeRowColorBlock: {
    boxShadow: "black -1px 0px 1px -1px",
    height: "0px",
    top: 0,
    transition: "width 0.2s ease-in-out",
    width: "0px"
  },
  contextMenuIcon: {
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 8px"
  },
  descriptionTextContainerDiv: {
    display: "grid",
    width: "95%"
  },
  descriptionTextDiv: {
    flexGrow: 1,
    minWidth: "50px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  menuIcon: {
    color: "#323130",
    cursor: "pointer",
    fontSize: "14px",
    height: "24px",
    lineHeight: "24px",
    margin: "0 auto",
    opacity: 0, // Icons are hidden by default
    padding: "0 8px",
    selectors: {
      ":hover": {
        color: "red", // Color changes when individual icon is hovered
        opacity: 1, // Make icon visible and change color on hover
        transform: "scale(1.25)"
      }
    },
    textAlign: "center",
    transform: "scale(1.15)",
    transition: "opacity 0.15s ease-in-out, color 0.3s, transform 0.08s ease-in-out",
    verticalAlign: "middle"
  },
  section: {
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #e1dfdd",
    borderRadius: "5px",
    height: "40px",
    margin: "0 auto",
    padding: "5px 0",
    selectors: {
      ".isFavorite": {
        color: "orange",
        opacity: 1,
        selectors: {
          ":hover": {
            color: "red"
          }
        }
      },
      ":hover": {
        backgroundColor: "#eaeaea",
        transform: "scale(1.02)", // slight scale up on hover,
        transition: "transform 0.15s ease-in-out, backgroundColor 0.35s"
      },
      ":hover .showIcon": {
        opacity: 1 // Icons become visible when the row is hovered
      },
      ":last-child": {
        borderBottom: "none" // no border for the last item
      }
    },
    textAlign: "left",
    transition: "transform 0.5s, backgroundColor 0.35s",
    userSelect: "none",
    verticalAlign: "middle"
  },
  sectionIcon: {
    color: "#323130",
    fontSize: "14px",
    padding: "4px 0", // slight padding for the text
    paddingLeft: "20px"
  },
  sectionText: {
    color: "#323130", // using a color from the Fluent UI neutral palette
    cursor: "pointer",
    fontSize: "14px", // slight padding for the text
    padding: "4px 0",
    paddingLeft: "20px",
    transition: "opacity 0.6s ease-in-out",
    width: "100%"
  }
});
