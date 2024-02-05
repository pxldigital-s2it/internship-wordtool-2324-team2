import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import React from "react";
import FreeFeedbackInput from "../FreeFeedbackInput";
import STRING_RESOURCES from "../Strings";
import { insertFreeFeedback } from "../../../taskpane/office-document";

describe('FreeFeedbackInput Integration Test Suite', () => {
    const officeDocument = require("../../../taskpane/office-document");

    test('Initial render', () => {
        const { getByText, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        expect(getByText(STRING_RESOURCES.freefeedbackinput.button.label)).toBeInTheDocument();
        expect(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder)).toBeInTheDocument();
    });

    describe('FreeFeedbackInput onClick to insert text', () => {
        test('should call insertFreeFeedback when button is clicked', async () => {
            const spy = jest.spyOn(officeDocument, 'insertFreeFeedback');
            const { getByText, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

            fireEvent.change(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder), { target: { value: "Test feedback" } });

            fireEvent.click(getByText(STRING_RESOURCES.freefeedbackinput.button.label));

            expect(spy).toHaveBeenCalledWith("Test feedback");
        });
    });
});