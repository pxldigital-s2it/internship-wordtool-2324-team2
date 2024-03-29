import { Toggle } from "@fluentui/react";
import * as React from "react";
import PropTypes from "prop-types";

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

SettingsToggle.propTypes = {
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SettingsToggle;