import React from "react";
import AddButton from "../AddButton";
import STRING_RESOURCES from "../Strings";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";


describe('AddButton Test Suite', () => {
  test('Initial Render', () => {
    const { getByText } = renderWithProviders(<AddButton />, { preloadedState: initialState });

    expect(getByText(STRING_RESOURCES.buttons.add.label)).toBeInTheDocument();
  });
});
