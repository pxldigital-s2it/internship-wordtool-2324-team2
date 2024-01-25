import useCategory from "../../hooks/useCategory";
import SubCategory from "../../types/SubCategory";
import { fireEvent } from "@testing-library/react";
import React from "react";
import CategoryForm from "../CategoryForm";
import { renderWithProviders } from "../../__tests__/utils/TestUtils";
import { initialState } from "../../redux/store";
import Category from "../../types/Category";

jest.mock("../../hooks/useCategory");

describe("CategoryForm Test Suite", () => {
  const subCategory: SubCategory = {
    categoryId: "testCategoryId",
    description: "testDescription",
    id: "testId"
  };
  const handleSubmit = jest.fn();
  const useCategoryMock = useCategory as unknown as jest.Mock;
  const setupUseCategoryMock = (data?: SubCategory | Category) => {
    useCategoryMock.mockImplementation(() => ({
      categoryTitle: "Test Title",
      data,
      handleSubmit
    }))
  };

  afterEach(() => {
    handleSubmit.mockReset();
    useCategoryMock.mockReset();
  });

  test("initial render", () => {
    setupUseCategoryMock(subCategory);
    const { container } = renderWithProviders(<CategoryForm />, { preloadedState: initialState });

    expect(container).toMatchSnapshot();
  });

  test("No data", () => {
    setupUseCategoryMock();
    const { container } = renderWithProviders(<CategoryForm />, { preloadedState: initialState });

    expect(container).toMatchSnapshot();
  });

  test("handleSubmit", () => {
    setupUseCategoryMock({ categoryId: "testCategoryId", description: null });
    const { container, getByText } = renderWithProviders(<CategoryForm />, { preloadedState: initialState });

    expect(getByText("Bevestigen")).toBeDisabled();

    fireEvent.change(container.querySelector("textarea#description-input"), { target: { value: "test" } });
    expect(getByText("Bevestigen")).not.toBeDisabled();

    fireEvent.click(getByText("Bevestigen"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("handleClose", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require("../../redux/hooks"), "useAppDispatch").mockImplementation(() => mockDispatch);
    jest.spyOn(require("../../middleware/modal/ModalMiddleware"), "closeModal").mockImplementation(() => ({ type: "closeModal" }));
    setupUseCategoryMock(subCategory);
    const { getByText } = renderWithProviders(<CategoryForm />, { preloadedState: initialState });

    fireEvent.click(getByText("Sluiten"));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].type).toEqual( "closeModal");
  });

});
