import React from "react";
import { ColorPicker, IColor } from "@fluentui/react";

import { ColourPickerProps } from "./ColourPicker.types";

const calculateRelativeLuminance = (value: number): number => {
  const normalizedValue = value / 255;
  return normalizedValue <= 0.03928
    ? normalizedValue / 12.92
    : Math.pow((normalizedValue + 0.055) / 1.055, 2.4);
};

const calculateContrastRatio = (color1: IColor, color2: IColor): number => {
  const luminance1 =
    0.2126 * calculateRelativeLuminance(color1.r) +
    0.7152 * calculateRelativeLuminance(color1.g) +
    0.0722 * calculateRelativeLuminance(color1.b);

  const luminance2 =
    0.2126 * calculateRelativeLuminance(color2.r) +
    0.7152 * calculateRelativeLuminance(color2.g) +
    0.0722 * calculateRelativeLuminance(color2.b);

  return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
};

const ColourPicker: React.FC<ColourPickerProps> = ({ selectedColor, setSelectedColor }) => {
  const onColorChanged = (_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
    setSelectedColor(color.str);

    const blackContrast = calculateContrastRatio(color, {
      b: 0,
      g: 0,
      h: 0,
      hex: "#000000",
      r: 0,
      s: 0,
      str: "#000000",
      v: 0
    });
    const redContrast = calculateContrastRatio(color, {
      b: 0,
      g: 0,
      h: 0,
      hex: "#FF0000",
      r: 255,
      s: 1,
      str: "#FF0000",
      v: 1
    });

    const contrastThreshold = 2.5; // Adjust the threshold as needed

    if (blackContrast < contrastThreshold) {
      console.warn("Warning: Low contrast with black text.");
    }

    if (redContrast < contrastThreshold) {
      console.warn("Warning: Low contrast with red text.");
    }
  };

  return (
    <ColorPicker color={selectedColor} onChange={onColorChanged} alphaType={"none"} showPreview={true} />
  );
};

export default ColourPicker;
