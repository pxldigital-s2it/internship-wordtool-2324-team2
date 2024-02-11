import { ColourObject } from "../../types/ColourObject";
import { RGBColour } from "../../types/RGBColour";
import { getColorObject } from "../ColorUtils";

describe("Color Test Suite", () => {
    test("if null hex value when getting colour object then white colour object returned", () => {
        const hex = null
        const result = getColorObject(hex);
        const expected = new ColourObject(new RGBColour(255, 255, 255), "#ffffff");
        expect(result.r).toEqual(expected.r);
        expect(result.g).toEqual(expected.g);
        expect(result.b).toEqual(expected.b);
        expect(result.hex).toEqual(expected.hex);
        expect(result.str).toEqual(expected.str);
        expect(result.h).toEqual(expected.h);
        expect(result.s).toEqual(expected.s);
        expect(result.v).toEqual(expected.v);
    });

    test("if null hex value when getting colour object then white colour object returned", () => {
        const hex = "#000000"
        const result = getColorObject(hex);
        const expected = new ColourObject(new RGBColour(0, 0, 0), hex);
        expect(result.r).toEqual(expected.r);
        expect(result.g).toEqual(expected.g);
        expect(result.b).toEqual(expected.b);
        expect(result.hex).toEqual(expected.hex);
        expect(result.str).toEqual(expected.str);
        expect(result.h).toEqual(expected.h);
        expect(result.s).toEqual(expected.s);
        expect(result.v).toEqual(expected.v);
    });
});