import React, { useState, useEffect } from "react";
import ColourPicker from "./ColourPicker";
import ColourSquare from "./ColourSquare";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectColour, setColour } from "../../redux/category/category.slice";
import { Button } from "@fluentui/react-components";

// Helper function to convert hex color to RGB
const hexToRgb = (hex) => {
  const validHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  if (!validHex.test(hex)) {
    throw new Error("Invalid hex color format");
  }

  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
};


// Updated getColorObject function
const getColorObject = (color) => {
  const { r, g, b } = hexToRgb(color);
  return {
    b, g, h: 0,
    hex: color, r, s: 0, // These values are not used in the contrast calculation
    str: color,
    v: 0
  };
};

// Calculate the perceived brightness of an RGB color
// Returns a value between 0 and 255
function getBrightness({ r, g, b }) {
  return Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
}

// Calculate Black text or Red text contrast differently, assuming red text on a "bright" background could be hard to read

const ColourPickerComponent = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const colour = useAppSelector(selectColour);
  const [contrastWarnings, setContrastWarnings] = useState<string[]>([]);

  const handleSelectColour = (newColour) => {
    dispatch(setColour(newColour));
  };

  const handleClosePanel = () => {
    setOpen(false);
    setContrastWarnings([]);
  };

  const calculateRelativeLuminance = (value) =>
    value / 255 <= 0.03928 ? value / 12.92 : ((value / 255 + 0.055) / 1.055) ** 2.4;

  const calculateContrastRatio = (color1, color2) => {
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

  useEffect(() => {
    try {
      const currentBackgroundColor = getColorObject(colour);
      const blackTextColor = getColorObject("#000000");
      const redTextColor = getColorObject("#FF0000");
      const backgroundColorBrightness = getBrightness(currentBackgroundColor);

      // Define the thresholds
      const normalContrastThreshold = 4.5;
      const largeTextContrastThreshold = 3;
      const highContrastThreshold = 7; // This would be for normal-sized black text on a dark background

      // Assuming we have a "dark" background if the brightness is below 50 out of 255
      const isDarkBackground = backgroundColorBrightness < 50;

      // Calculate the contrast ratios
      const blackTextContrast = calculateContrastRatio(currentBackgroundColor, blackTextColor);
      const redTextContrast = calculateContrastRatio(currentBackgroundColor, redTextColor);

      const warnings = [];
// Push warnings based on contrast and background color brightness
      if (blackTextContrast < (isDarkBackground ? highContrastThreshold : normalContrastThreshold)) {
        warnings.push("Low contrast with black text.");
      }
      if (redTextContrast < largeTextContrastThreshold) {
        warnings.push("Low contrast with red text.");
      }

      setContrastWarnings(warnings);
    } catch (error) {
      console.error(error);
    }
  }, [colour]);

  return (
    <div>
      {open ? (
        <>
          <ColourPicker selectedColor={colour} setSelectedColor={handleSelectColour} />
          <Button onClick={handleClosePanel}>Choose this color</Button>
          {contrastWarnings.length > 0 ? (
            <div>
              {contrastWarnings.map((warning, index) => (
                <p key={index}>{warning}</p>
              ))}
            </div>
          ) : (
            <p>No contrast warnings</p>
          )}
          <p>Preview:</p>
          <div style={{ backgroundColor: colour, padding: "10px" }}>
            <p style={{ color: "#000000" }}>Black text preview</p>
            <p style={{ color: "#FF0000" }}>Red text preview</p>
          </div>
        </>
      ) : (
        <div onClick={() => setOpen(true)}>
          <ColourSquare colour={colour} />
          {contrastWarnings.length > 0 ? (
            <div>
              <input type="button" onClick={() => setOpen(true)} />
              {contrastWarnings.map((warning, index) => (
                <p key={index}>{warning}</p>
              ))}
            </div>
          ) : (
            <p>No contrast warnings</p>
          )}
        </div>
      )}
    </div>
  );
};

// Note that "getColorObject" from the original code isn't altered and should be included above this component.
export default ColourPickerComponent;