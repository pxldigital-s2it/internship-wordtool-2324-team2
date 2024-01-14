import React from "react";
import Section from "../Section";
import { fireEvent } from "@testing-library/react";
import { initialState } from "../../../../redux/store";
import {renderWithProviders} from "../../../../__tests__/utils/TestUtils";

describe('Section Test Suite', () => {
    test('Initial render', () => {
      const { getByText } = renderWithProviders(<Section />, { preloadedState: initialState });
      expect(getByText('Section Content')).toBeInTheDocument();
    });

    test('Context menu opens on right click', () => {
        const { getByText } = renderWithProviders(<Section />, { preloadedState: initialState });

        const sectionContent = getByText('Section Content');

        fireEvent.contextMenu(sectionContent);

        const contextMenuWijzigen = getByText('Wijzigen');
        const contextMenuVerwijderen = getByText('Verwijderen');
        expect(contextMenuWijzigen).toBeInTheDocument();
        expect(contextMenuVerwijderen).toBeInTheDocument();
    });
});
