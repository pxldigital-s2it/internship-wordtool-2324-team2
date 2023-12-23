import React, { useState } from 'react';
import {ColorPicker, getColorFromString, IColor} from '@fluentui/react';


interface ColourPickerProps {
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}


const ColourPicker: React.FC<ColourPickerProps> = ({ selectedColor,setSelectedColor}) => {
    const onColorChanged = (_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
        setSelectedColor(color.str);
    };

    return (
        <div data-testid="color-picker">
            <ColorPicker color={selectedColor} onChange={onColorChanged} alphaType={"none"} showPreview={true} />
        </div>
    );
            
};

export default ColourPicker;