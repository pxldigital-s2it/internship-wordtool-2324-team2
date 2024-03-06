import { initialState } from "../../../redux/store";
import React from "react";
import ColourPickerComponent from "../ColourPickerComponent";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { categoryClassNames } from "../../category/maincategory/CategoryComponent.styles";
import { fireEvent } from "@testing-library/react";

describe("ColourPickerComponent Test Suite", () => {

    test("Initial render", () => {
        const { container } = renderWithProviders(<ColourPickerComponent/>, { preloadedState: initialState });
        expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeInTheDocument();
        expect(container.querySelector("#closeButton")).toBeNull();
    });

    test("Open ColourPicker", () => {
        const { container } = renderWithProviders(<ColourPickerComponent/>, { preloadedState: initialState });

        fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));

        expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeNull();
        expect(container.querySelector("#closeButton")).toBeInTheDocument();
    });

    test("Select colour", () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../redux/hooks"), "useAppDispatch").mockReturnValue(dispatchMock);
        const { container, getByLabelText } = renderWithProviders(
            <ColourPickerComponent/>, { preloadedState: initialState });

        fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));
        fireEvent.change(getByLabelText("Hex"), { target: { value: "999999" } });

        expect(dispatchMock).toHaveBeenCalledWith({ payload: "#999999", type: "category/setColour" });
    });

    test("Close ColourPicker", () => {
        const { container } = renderWithProviders(<ColourPickerComponent/>, { preloadedState: initialState });

        fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));
        fireEvent.click(container.querySelector("#closeButton"));

        expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeInTheDocument();
        expect(container.querySelector("#closeButton")).toBeNull();
    });

    test("If change colour when low contrast then show low contrast warning", async () => {
        jest.spyOn(require("../../../utils/ContrastUtils"), "isLowContrast").mockReturnValue(true);
        const { container } = renderWithProviders(
            <ColourPickerComponent/>, { preloadedState: initialState });

        fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));

        const warningElement = container.querySelector("#contrastWarning")
        expect(warningElement).toBeInTheDocument();
        expect(warningElement).toHaveTextContent("Laag contrast: slecht leesbaar");
    });

    test("If change colour when not low contrast then show low contrast warning", async () => {
        jest.spyOn(require("../../../utils/ContrastUtils"), "isLowContrast").mockReturnValue(false);
        const { container } = renderWithProviders(
            <ColourPickerComponent/>, { preloadedState: initialState });

        fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));

        const warningElement = container.querySelector("#contrastWarning")
        expect(warningElement).toBeInTheDocument();
        expect(warningElement).toBeEmptyDOMElement();
    });

})