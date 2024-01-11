import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import STRING_RESOURCES from './Strings';

// button for adding new categories and subcategories
const AddButton: React.FC = () => {
  return (
    <PrimaryButton
      iconProps={{ iconName: 'Add' }}
      text={STRING_RESOURCES.buttons.add.label}
      // apply the primary style from Fluent UI
      // styled with Word's theme colors
      styles={{
        root: {
          color: "#fff", // text color
          marginTop: 10
        },
        rootHovered: {
          backgroundColor: '#106ebe' // on hover, darker blue
        }
      }}
    />
  );
};

export default AddButton;
