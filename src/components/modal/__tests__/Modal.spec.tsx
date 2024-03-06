import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import React from "react";
import Modal from "../Modal";

describe("Modal Test Suite", () => {
    const DEFAULT_STATE = initialState;

    test("Initial render closed", () => {
        const { queryByRole } = renderWithProviders(<Modal/>, { preloadedState: DEFAULT_STATE });
        expect(queryByRole("dialog")).toBeNull();
    });

    test("Initial render open", () => {
        const state =
            {
                ...DEFAULT_STATE,
                modal: {
                    ...DEFAULT_STATE.modal,
                    open: true
                }
            };
        const { queryByRole } = renderWithProviders(<Modal/>, { preloadedState: state });
        expect(queryByRole("dialog")).toBeInTheDocument();
    });

});