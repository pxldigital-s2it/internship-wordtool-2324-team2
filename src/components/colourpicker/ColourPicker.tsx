import React from "react";
import { ColorPicker, IColor } from "@fluentui/react";

import { ColourPickerProps } from "./ColourPicker.types";

const ColourPicker: React.FC<ColourPickerProps> = ({ selectedColor, setSelectedColor }) => {
    const onColorChanged = (_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
        setSelectedColor(color.str);
    };

    return (
        <ColorPicker color={selectedColor} onChange={onColorChanged} alphaType={"none"} showPreview={true}/>
    );
};

export default ColourPicker;