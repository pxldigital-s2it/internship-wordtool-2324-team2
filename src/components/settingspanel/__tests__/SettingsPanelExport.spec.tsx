import getOfficeMock from "../../../__tests__/utils/OfficeMockUtils";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { SettingsPanel } from "../SettingsPanel";
import { initialState } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import STRING_RESOURCES from "../Strings";
import React from "react";

describe("SettingsPanel Export Test Suite", () => {
  const writeExportSpy = jest.spyOn(require("../../../utils/TextInsertUtils"), "writeExport");
  const clearLocalStorageSpy = jest.spyOn(require("../../../middleware/category/CategoryMiddleware"), "_clearLocalStorage");
  const importFromWordSpy = jest.spyOn(require("../../../middleware/category/CategoryMiddleware"), "importFromWord");
  const dispatchMock = jest.fn();

  beforeEach(() => {
    getOfficeMock("", [], false, false);
    jest.spyOn(require("../../../redux/hooks"), "useAppDispatch").mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("writeExport is called when export button is clicked", () => {
    const { getByLabelText, getByText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));
    fireEvent.click(getByText(STRING_RESOURCES.settings.labels.exportToWord));

    expect(writeExportSpy).toHaveBeenCalledTimes(1);
  });

  test("importFromWord is called when import button is clicked", () => {
    const { getByLabelText, getByText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));
    fireEvent.click(getByText(STRING_RESOURCES.settings.labels.importFromWord));

    expect(importFromWordSpy).toHaveBeenCalledTimes(1);

    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).not.toBeVisible();
  });

  test("clearLocalStorage is called when clear button is clicked", () => {
    const { getByLabelText, getByText } = renderWithProviders(<SettingsPanel />, { preloadedState: initialState });

    fireEvent.click(getByLabelText(STRING_RESOURCES.settings.buttons.settingsText));
    fireEvent.click(getByText(STRING_RESOURCES.settings.labels.clearLocalStorage));

    expect(clearLocalStorageSpy).toHaveBeenCalledTimes(1);

    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHoisting)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.favoritesHiding)).not.toBeVisible();
    expect(getByLabelText(STRING_RESOURCES.settings.labels.alwaysInsertFullText)).not.toBeVisible();
  });
});
