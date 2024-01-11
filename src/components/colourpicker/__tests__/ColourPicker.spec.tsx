import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ColourPicker from "../ColourPicker";

describe("ColourPicker Test Suite", () => {
    const setSelectedColor = jest.fn();
    const createComponent = (selectedColor: string = "#000000") => (
        <ColourPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />);

    test("Initial render", () => {
        const { getByLabelText, rerender } = render(createComponent());
        expect(getByLabelText("Color picker, Red 0 Green 0 Blue 0 selected.")).toBeInTheDocument();

        rerender(createComponent("#999999"));
        expect(getByLabelText("Color picker, Red 153 Green 153 Blue 153 selected.")).toBeInTheDocument();
    });

    test("onChange calls setSelectedColor with correct color", () => {
        const { getByLabelText } = render(createComponent());

        fireEvent.change(getByLabelText("Hex"), { target: { value: "999999" } });

        expect(setSelectedColor).toHaveBeenCalledWith("#999999");
    });

});