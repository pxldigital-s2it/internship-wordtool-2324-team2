import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import STRING_RESOURCES from "../Strings";
import React from "react";
import { SettingsPanel } from "../SettingsPanel";
import { fireEvent } from "@testing-library/react";

describe("SettingsPanel Test Suite", () => {

  test("initial render", () => {
    const { getByLabelText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    expect(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText)).toBeInTheDocument();
  });

  test("click on the settings button opens the panel", () => {
    const { getByLabelText, getByText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));

    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).toBeInTheDocument();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).toBeInTheDocument();
    expect(getByText(STRING_RESOURCES.settings.buttons.cancelText)).toBeInTheDocument();
  });

  test("favoritesHoisting is changed when toggle is clicked", () => {
    const { getByLabelText, store } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));

    expect(store.getState().settings.favoritesHoisting).toBe(false);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).not.toBeChecked();

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting));

    expect(store.getState().settings.favoritesHoisting).toBe(true);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeChecked();
  });

  test("favoritesHiding is changed when toggle is clicked", () => {
    const { getByLabelText, store } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));

    expect(store.getState().settings.favoritesHiding).toBe(false);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).not.toBeChecked();

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding));

    expect(store.getState().settings.favoritesHiding).toBe(true);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).toBeChecked();
  });

  test("alwaysInsertFullText is changed when toggle is clicked", () => {
    const { getByLabelText, store } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));

    expect(store.getState().settings.alwaysInsertFullText).toBe(false);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).not.toBeChecked();

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText));

    expect(store.getState().settings.alwaysInsertFullText).toBe(true);
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).toBeChecked();
  });

  test("click on the cancel button closes the panel", () => {
    const { getByLabelText, getByText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));

    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).toBeInTheDocument();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).toBeInTheDocument();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).toBeInTheDocument();
    expect(getByText(STRING_RESOURCES.settings.buttons.cancelText)).toBeInTheDocument();

    fireEvent.click(getByText(STRING_RESOURCES.settings.buttons.cancelText));

    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).not.toBeVisible();
  });
});
