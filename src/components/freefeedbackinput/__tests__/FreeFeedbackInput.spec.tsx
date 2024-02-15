import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import {fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import FreeFeedbackInput from "../FreeFeedbackInput";
import STRING_RESOURCES from "../Strings";
import { insertFreeFeedback } from "../../../taskpane/office-document";

jest.mock("../../../taskpane/office-document");

describe('FreeFeedbackInput Integration Test Suite', () => {
    test('Initial render', () => {
        const { getByTitle, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        expect(getByTitle(STRING_RESOURCES.freefeedbackinput.button.title)).toBeInTheDocument();
        expect(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder)).toBeInTheDocument();
    });

    test('FreeFeedbackInput onClick to insert text should call insertFreeFeedback when button is clicked', () => {
        const { getByTitle, getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        fireEvent.change(getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder), { target: { value: "Test feedback" } });

        fireEvent.click(getByTitle(STRING_RESOURCES.freefeedbackinput.button.title));

        expect(insertFreeFeedback).toHaveBeenCalledWith("Test feedback");
    });

    test('FreeFeedbackInput key down enter to insert text should call insertFreeFeedback', async () => {
        const { getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        const freeInputTextarea = getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder);

        fireEvent.change(freeInputTextarea, { target: { value: "Test feedback" } });

        fireEvent.keyDown(freeInputTextarea, { key: "Enter", code: 13, charCode: 13 });

        expect(insertFreeFeedback).toHaveBeenCalledWith("Test feedback");

        (insertFreeFeedback as jest.Mock).mockResolvedValue(true);

        // In de test gooit de insertFreeFeedback method een error en wordt daarna de setText(""); niet meer uitgevoerd
        // Vandaar faalt onderstaande regel
        await waitFor(() =>
            expect(freeInputTextarea.textContent).toBe("")
        );
    });

    test('FreeFeedbackInput key down escape to clear textarea', () => {
        const { getByPlaceholderText } = renderWithProviders(<FreeFeedbackInput  />, { preloadedState: initialState });

        const freeInputTextarea = getByPlaceholderText(STRING_RESOURCES.freefeedbackinput.textarea.placeholder);

        fireEvent.change(freeInputTextarea, { target: { value: "Test feedback" } });

        fireEvent.keyDown(freeInputTextarea, { key: "Escape", code: 13, charCode: 13 });

        expect(freeInputTextarea.textContent).toBe("");
    });
});