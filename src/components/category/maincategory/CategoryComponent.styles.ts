import { mergeStyleSets } from "@fluentui/react";

export const categoryClassNames = mergeStyleSets({
  arrowIcon: {
    color: "#005a9e",
    fontSize: "12px",
    marginRight: 10
  },
  categoryContent: {
    padding: "10px 20px"
  },
  categoryHeader: {
    alignItems: "center",
    backgroundColor: "#eff6fc",
    borderBottom: "1px solid #cccccc",
    color: "#005a9e",
    cursor: "pointer",
    display: "flex",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px 20px"
  },
  categoryTitle: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  colorSquare: {
    border: "1px solid #ccc",
    cursor: "pointer",
    height: "20px",
    marginLeft: "10px",
    width: "20px"
  }
});