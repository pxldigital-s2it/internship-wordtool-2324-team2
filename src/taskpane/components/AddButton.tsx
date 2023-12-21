import * as React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";

// button for adding new categories and subcategories
const AddButton: React.FC = () => {
  return (
    <PrimaryButton
      iconProps={{ iconName: "Add" }}
      text="Add Category/Subcategory"
      // apply the primary style from Fluent UI
      // styled with Word's theme colors
      styles={{
        root: {
          color: "#fff", // text color
          marginTop: 10
        },
        rootHovered: {
          // on hover, darker blue
          backgroundColor: "#106ebe"
        }
      }}
    />
  );
};

export default AddButton;
