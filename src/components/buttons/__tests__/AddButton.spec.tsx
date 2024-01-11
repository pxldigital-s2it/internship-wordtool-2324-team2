import { render } from "@testing-library/react";
import React from "react";
import AddButton from "../AddButton";
import STRING_RESOURCES from '../Strings';


describe('AddButton Test Suite', () => {
  test('Initial Render', () => {
    const { getByText } = render(<AddButton />);

    expect(getByText(STRING_RESOURCES.buttons.add.label)).toBeInTheDocument();
  });
});
