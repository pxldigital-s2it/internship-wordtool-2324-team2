import { initialState } from "../../../redux/store";
import React from "react";
import ColourPickerComponent from "../ColourPickerComponent";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { categoryClassNames } from "../../category/maincategory/CategoryComponent.styles";
import { fireEvent } from "@testing-library/react";

describe("ColourPickerComponent Test Suite", () => {

  test("Initial render", () => {
    const { container, queryByText } = renderWithProviders(<ColourPickerComponent />, { preloadedState: initialState });
    expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeInTheDocument();
    expect(queryByText("Deze kleur")).toBeNull();
  });

  test("Open ColourPicker", () => {
    const { container, queryByText } = renderWithProviders(<ColourPickerComponent />, { preloadedState: initialState });

    fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));

    expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeNull();
    expect(queryByText("Deze kleur")).toBeInTheDocument();
  });

  test("Select colour", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require( "../../../redux/hooks"), "useAppDispatch").mockReturnValue(dispatchMock);
    const { container, getByLabelText } = renderWithProviders(<ColourPickerComponent />, { preloadedState: initialState });

    fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));
    fireEvent.change(getByLabelText("Hex"), { target: { value: "999999" } });

    expect(dispatchMock).toHaveBeenCalledWith({ payload: "#999999", type: "category/setColour" });
  });

  test("Close ColourPicker", () => {
    const { container, queryByText } = renderWithProviders(<ColourPickerComponent />, { preloadedState: initialState });

    fireEvent.click(container.querySelector(`div.${categoryClassNames.colorSquare}`));
    fireEvent.click(queryByText("Deze kleur"));

    expect(container.querySelector(`div.${categoryClassNames.colorSquare}`)).toBeInTheDocument();
    expect(queryByText("Deze kleur")).toBeNull();
  });

})
