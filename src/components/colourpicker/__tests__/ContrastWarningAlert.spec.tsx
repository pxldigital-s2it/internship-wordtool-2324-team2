import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import React from "react";
import ContrastWarning from "../ContrastWarning";
import { fireEvent } from "@testing-library/react";

describe("ColourPickerComponent Test Suite", () => {
    const openState =
        {
            ...initialState,
            contrastWarningAlert: {
                ...initialState.contrastWarningAlert,
                open: true
            }
        };
    test("Initial render closed", () => {
        const { queryByRole } = renderWithProviders(<ContrastWarning/>, { preloadedState: initialState });
        expect(queryByRole("alertdialog")).toBeNull();
    });

    test("Initial render open", () => {
        const { queryByRole } = renderWithProviders(<ContrastWarning/>, { preloadedState: openState });
        expect(queryByRole("alertdialog")).toBeInTheDocument();
    });

    test("when click no then close alert", () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../redux/hooks"), "useAppDispatch").mockReturnValue(dispatchMock);
        jest.spyOn(require("../../../middleware/contrastwarningalert/ContrastWarningAlertMiddleware"), "closeContrastWarningAlert").mockImplementation(() => ({ type: "closeContrastWarningAlert" }));

        const { getByText } = renderWithProviders(<ContrastWarning/>, { preloadedState: openState });

        fireEvent.click(getByText("Nee"));

        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock.mock.calls[0][0].type).toEqual("closeContrastWarningAlert");
    });

    test("when click yes then handle confirm", () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../redux/hooks"), "useAppDispatch").mockReturnValue(dispatchMock);
        const { getByText } = renderWithProviders(<ContrastWarning/>, { preloadedState: openState });

        fireEvent.click(getByText("Ja"));

        expect(dispatchMock).toHaveBeenCalledWith({
            payload: true,
            type: "contrast-warning-alert/setConfirmBeingHandled"
        });
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: true,
            type: "contrast-warning-alert/setDisabled"
        });
    });
});