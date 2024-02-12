import { isLowContrast } from "../ContrastUtils";
import { ColourObject } from "../../types/ColourObject";
import { RGBColour } from "../../types/RGBColour";

describe("Contrast Test Suite", () => {
    test("if low contrast when check is low contrast then return true", () => {
        const result = isLowContrast(new ColourObject(new RGBColour(33, 152, 255), "#2198FF"));
        expect(result).toBe(true);
    });

    test("if not low contrast when check is low contrast then return false", () => {
        const result = isLowContrast(new ColourObject(new RGBColour(0, 153, 255), "#0099FF"));
        expect(result).toBe(false);
    });
});