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
        padding: "10px 20px",
        selectors: {
            ":hover": {
                // translate X
                transform: "translateX(2px)",
                transition: "transform 0.15s ease"
            }
        }
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
        height: "24px",
        selectors: {
            ":hover": {
                border: "1px solid #005a9e",
                opacity: 0.8
            }
        },
        userSelect: "none",
        width: "48px"
    }
});