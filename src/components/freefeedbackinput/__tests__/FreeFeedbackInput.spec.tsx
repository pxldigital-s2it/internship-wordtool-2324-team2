import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import React from "react";
import FreeFeedbackInput from "../FreeFeedbackInput";
import STRING_RESOURCES from "../Strings";

describe('FreeFeedbackInput Integration Test Suite', () => {
    const officeDocument = require("../../../taskpane/office-document");

    test('Initial render', () => {
        const { getByTitle, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        expect(getByTitle(STRING_RESOURCES.freefeedbackinput.button.title)).toBeInTheDocument();
        expect(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder)).toBeInTheDocument();
    });

    test('FreeFeedbackInput onClick to insert text should call insertFreeFeedback when button is clicked', () => {
        const { getByTitle, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });
        const spy = jest.spyOn(officeDocument, "insertFreeFeedback");

        fireEvent.change(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder), { target: { value: "Test feedback" } });

        fireEvent.click(getByTitle(STRING_RESOURCES.freefeedbackinput.button.title));

        expect(spy).toHaveBeenCalledWith("Test feedback");
    });
});