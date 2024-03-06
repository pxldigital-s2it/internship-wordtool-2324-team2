import { IColor } from "@fluentui/react";
import { RGBColour } from "./RGBColour";

export class ColourObject implements IColor {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    v: number;
    hex: string;
    str: string;

    constructor(rgbColour: RGBColour, hex: string) {
        this.r = rgbColour.r;
        this.g = rgbColour.g;
        this.b = rgbColour.b;

        this.hex = hex;
        this.str = hex;

        this.h = 0;
        this.s = 0;
        this.v = 0;
    }
}