import {Toggle} from "@fluentui/react";
import * as React from "react";

const SettingsToggle = ({ label, checked, onChange }) => {
  return <div style={{ paddingLeft: '16px' }}>
      <Toggle
          label={label}
          checked={checked}
          onChange={onChange}
          style={{ margin: '10px' }}
      />
  </div>
};

export default SettingsToggle;