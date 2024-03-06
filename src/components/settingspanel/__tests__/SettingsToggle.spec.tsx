import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import STRING_RESOURCES from "../Strings";
import React from "react";
import SettingsToggle from "../SettingsToggle";

describe('SettingsToggle Test Suite', () => {
    test('Initial render', () => {
        const { getByText } = renderWithProviders(<SettingsToggle
            label={STRING_RESOURCES.settings.labels.favoritesHoisting} checked={true}
            onChange={() => false}/>, { preloadedState: initialState });

        expect(getByText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
    });
});