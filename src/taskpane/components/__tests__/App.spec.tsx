import { loadInitialStorage } from "../../../utils/StorageUtils";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import App from "../App";
import { initialState } from "../../../redux/store";
import React from "react";


jest.mock("../../../utils/StorageUtils");
describe("App Test Suite", () => {
  it("should loadInitialData on app render", () => {
    renderWithProviders(<App/>, { preloadedState: initialState })
    expect(loadInitialStorage).toHaveBeenCalledTimes(1);
  });
});
