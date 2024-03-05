import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import STRING_RESOURCES from "../Strings";
import React from "react";
import { SettingsPanel } from "../SettingsPanel";
import { fireEvent } from "@testing-library/react";
import {Toggle} from "@fluentui/react";
import SettingsToggle from "../SettingsToggle";

describe('SettingsPanel Test Suite', () => {
    test('Initial render', () => {
        const { getByLabelText } = renderWithProviders(<SettingsPanel  />, { preloadedState: initialState });

        expect(getByLabelText(STRING_RESOURCES.settings.buttons.ariaLabel)).toBeInTheDocument();
    });

    test('Click on the settings button opens the panel', () => {
        const { getByLabelText } = renderWithProviders(<SettingsPanel  />, { preloadedState: initialState });

        fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.ariaLabel));

        expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
        expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).toBeInTheDocument();
        expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).toBeInTheDocument();
    });

    test('Toggle', () => {
        const { getByLabelText } = renderWithProviders(<SettingsPanel  />, { preloadedState: initialState });

        fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.ariaLabel));

        fireEvent.click(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting));

        const favoritesHoistingToggle = getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting) as (typeof SettingsToggle);

        expect(favoritesHoistingToggle.checked)

        expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
        expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).toBeInTheDocument();
        expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).toBeInTheDocument();
    });
});