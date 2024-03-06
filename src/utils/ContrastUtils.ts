import { IColor } from "@fluentui/react";

export const isLowContrast = (backgroundColour: IColor): boolean => {
    const contrastTreshold = 7;

    let contrastWithBlackText = calculateContrastRatioWithBlackText(backgroundColour);

    return contrastWithBlackText < contrastTreshold;
}

const calculateContrastRatioWithBlackText = (backgroundColour: IColor): number => {
    const blackLuminance = 0

    const luminanceOfBackground =
        0.2126 * calculateRelativeLuminance(backgroundColour.r) +
        0.7152 * calculateRelativeLuminance(backgroundColour.g) +
        0.0722 * calculateRelativeLuminance(backgroundColour.b);

    return (luminanceOfBackground + 0.05) / (blackLuminance + 0.05);
};

const calculateRelativeLuminance = (value: number): number => {
    const normalizedValue = value / 255;
    return normalizedValue <= 0.03928
        ? normalizedValue / 12.92
        : Math.pow((normalizedValue + 0.055) / 1.055, 2.4);
};