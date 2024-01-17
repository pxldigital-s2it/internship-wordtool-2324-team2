import React from "react";
import AddButton from "../AddButton";
import STRING_RESOURCES from "../Strings";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";


describe('AddButton Test Suite', () => {
  test('Initial Render', () => {
    const { getByText } = renderWithProviders(<AddButton />, { preloadedState: initialState });

    expect(getByText(STRING_RESOURCES.buttons.add.label)).toBeInTheDocument();
  });

  test("Clicking the button should call the onClick function", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("../../../redux/hooks"), 'useAppDispatch').mockReturnValue(dispatchMock);
    jest.spyOn(require("../../../middleware/modal/ModalMiddleware"), 'openCreateCategoryModal').mockReturnValue({ type: 'OPEN_CREATE_CATEGORY_MODAL' });
    const { getByText } = renderWithProviders(<AddButton  />, { preloadedState: initialState });

    fireEvent.click(getByText(STRING_RESOURCES.buttons.add.label));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'OPEN_CREATE_CATEGORY_MODAL' });
  });

});
