import { Icon } from "@fluentui/react";
import React from "react";

interface IconWithTextProps {
    icon: string;
    text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) =>
    (
        <div><Icon iconName={icon}></Icon> <b>{text}</b></div>
    );

export default IconWithText;