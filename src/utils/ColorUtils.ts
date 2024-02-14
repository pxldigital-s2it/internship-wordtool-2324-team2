import { RGBColour } from "../types/RGBColour";
import { ColourObject } from "../types/ColourObject";

export const getColorObject = (color): ColourObject => {
    const rgbColour: RGBColour = hexToRgb(color);
    return new ColourObject(rgbColour, color);
};

export const hexToRgb = (hex): RGBColour => {
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
    return new RGBColour(r, g, b);
};