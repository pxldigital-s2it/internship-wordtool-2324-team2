import React from "react";
import { fireEvent } from "@testing-library/react";
import CategoryComponent from "../../maincategory/CategoryComponent";
import Category from "../../../../types/Category";
import SubCategory from "../../../../types/SubCategory";
import { categoryClassNames } from "../../maincategory/CategoryComponent.styles";
import SubCategoryComponent from "../SubCategoryComponent";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";
import { insertAndHighlightText } from "../SubCategoryComponent.utils";

jest.mock("../SubCategoryComponent.utils");

describe("SubCategoryComponent Integration Test Suite", () => {
  const mockSubCategories: SubCategory[] = [
    {
      categoryId: "cat-1",
      description: "SubCategory 1 Description",
      id: "subcat-1",
      isFavorite: false
    },
    {
      categoryId: "cat-1",
      description: "SubCategory 2 Description",
      id: "subcat-2",
      isFavorite: false
    }
  ];

  const mockCategory: Category = {
    code: "test",
    id: "cat-1",
    subCategories: mockSubCategories,
    title: "Test Category"
  };
  test("Initial render", () => {
    const { getByText } = renderWithProviders(<SubCategoryComponent
      key={mockSubCategories[0].id} {...mockSubCategories[0]} />, { preloadedState: initialState });
    expect(getByText(new RegExp(mockSubCategories[0].description, "i"))).toBeInTheDocument();
  });

  test("SubCategoryComponent renders within CategoryComponent", () => {
    const { getByText, queryByText, container } = renderWithProviders(
      <CategoryComponent {...mockCategory} />, { preloadedState: initialState });
    const categoryTitleWithCount = `${mockCategory.title} (${mockSubCategories.length})`;

    // check if CategoryComponent renders correctly with title and subcategory count
    expect(getByText(categoryTitleWithCount)).toBeInTheDocument();

    // initially, SubCategoryComponents should not be visible
    mockSubCategories.forEach(subCat => {
      expect(queryByText(subCat.description)).not.toBeInTheDocument();
    });

    // click to expand the CategoryComponent and show SubCategoryComponents
    fireEvent.click(getByText(categoryTitleWithCount));

    // check if SubCategoryComponents are now visible
    mockSubCategories.forEach(subCat => {
      expect(getByText(new RegExp(subCat.description, "i"))).toBeInTheDocument();
    });

    // check if the correct number of SubCategoryComponents are rendered
    expect(container.querySelectorAll(`.${categoryClassNames.categoryContent} > div`).length).toBe(mockSubCategories.length);
  });

  describe("SubCategoryComponent Context Menu", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
    jest.spyOn(require("../../../../middleware/category/CategoryMiddleware"), "deleteSubCategory").mockImplementation((id) => ({
      payload: id,
      type: "DELETE_SUB_CATEGORY"
    }));


    describe("Subcategory onClick to insert text", () => {
      test("should call insertAndHighlightText when span is clicked", async () => {
        const shortCode = "1";
        const { getByText } = renderWithProviders(<SubCategoryComponent
          categoryId={mockCategory.id} {...mockSubCategories[0]} shortCode={shortCode}/>, { preloadedState: initialState });

        fireEvent.click(getByText(new RegExp(mockSubCategories[0].description, "i")));

        expect(insertAndHighlightText).toHaveBeenCalledWith(
          mockCategory.id,
          mockSubCategories[0].description,
          shortCode
        );
      });
    });
  });
});
