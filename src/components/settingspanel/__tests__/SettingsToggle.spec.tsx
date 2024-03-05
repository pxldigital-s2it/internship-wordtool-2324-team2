import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import STRING_RESOURCES from "../Strings";
import React from "react";
import SettingsToggle from "../SettingsToggle";
import {
    selectAlwaysInsertFullText, selectFavoritesHiding, selectFavoritesHoisting,
    toggleAlwaysInsertFullText, toggleFavoritesHiding,
    toggleFavoritesHoisting
} from "../../../redux/settings/settings.slice";
import {useAppSelector} from "../../../redux/hooks";

describe('SettingsToggle Test Suite', () => {
    test('Initial render', () => {
        const { getByText } = renderWithProviders(<SettingsToggle label={STRING_RESOURCES.settings.labels.favoritesHoisting} checked={true} onChange={() => false} />, { preloadedState: initialState });

        expect(getByText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
    });

    test('Toggle', () => {
        const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);
        const favoritesHoisting = useAppSelector(selectFavoritesHoisting);
        const favoritesHiding = useAppSelector(selectFavoritesHiding);
        const { getByText } = renderWithProviders(<SettingsToggle label={STRING_RESOURCES.settings.labels.favoritesHoisting} checked={true} onChange={() => false} />, { preloadedState: initialState });

        expect(getByText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
    });
});