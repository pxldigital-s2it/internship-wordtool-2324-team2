import React from "react";
import { fireEvent } from "@testing-library/react";
import CategoryComponent from "../../maincategory/CategoryComponent";
import Category from "../../../../types/Category";
import SubCategory from "../../../../types/SubCategory";
import { categoryClassNames } from "../../maincategory/CategoryComponent.styles";
import SubCategoryComponent from "../SubCategoryComponent";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";
import { categoryContextMenu } from "../../../../patterns/observer";
import insertAndHighlightText from "../../../../taskpane/office-document";

jest.mock("../../../../taskpane/office-document");

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
    expect(getByText(mockSubCategories[0].description)).toBeInTheDocument();
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
      expect(getByText(subCat.description)).toBeInTheDocument();
    });

    // check if the correct number of SubCategoryComponents are rendered
    expect(container.querySelectorAll(`.${categoryClassNames.categoryContent} > div`).length).toBe(mockSubCategories.length);
  });

  describe("SubCategoryComponent Context Menu", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
    jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "openUpdateSubCategoryModal").mockImplementation((id) => ({
      payload: id,
      type: "OPEN_CREATE_SUB_CATEGORY_MODAL"
    }));
    jest.spyOn(require("../../../../middleware/category/CategoryMiddleware"), "deleteSubCategory").mockImplementation((id) => ({
      payload: id,
      type: "DELETE_SUB_CATEGORY"
    }));

    test("Context menu opens on right click on 'Meer bekijken' icon", async () => {
      const { getByTitle, findByText } = renderWithProviders(<SubCategoryComponent
        categoryId={mockCategory.id} {...mockSubCategories[0]} />, { preloadedState: initialState });

      const meerBekijkenIcon = getByTitle("Meer bekijken");

      fireEvent.contextMenu(meerBekijkenIcon);

      const contextMenuWijzigen = await findByText("Wijzigen");
      const contextMenuVerwijderen = await findByText("Verwijderen");

      // Assertions to ensure the context menu options are rendered
      expect(contextMenuWijzigen).toBeInTheDocument();
      expect(contextMenuVerwijderen).toBeInTheDocument();
    });


    test("Clicking on the Wijzigen option opens the update modal", async () => {
      const { getByTitle, findByText } = renderWithProviders(<SubCategoryComponent
        categoryId={mockCategory.id} {...mockSubCategories[0]} />, { preloadedState: initialState });

      const meerBekijkenIcon = getByTitle("Meer bekijken");

      fireEvent.contextMenu(meerBekijkenIcon);

      const contextMenuWijzigen = await findByText("Wijzigen");

      fireEvent.click(contextMenuWijzigen);
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: mockSubCategories[0],
        type: "OPEN_CREATE_SUB_CATEGORY_MODAL"
      });
    });

    test("Clicking on the Verwijderen option calls deleteSubCategory", async () => {
      const { getByTitle, findByText } = renderWithProviders(<SubCategoryComponent
        categoryId={mockCategory.id} {...mockSubCategories[0]} />, { preloadedState: initialState });

      const meerBekijkenIcon = getByTitle("Meer bekijken");

      fireEvent.contextMenu(meerBekijkenIcon);

      const contextMenuVerwijderen = await findByText("Verwijderen");

      fireEvent.click(contextMenuVerwijderen);

      expect(dispatchMock).toHaveBeenCalledWith({ payload: mockSubCategories[0].id, type: "DELETE_SUB_CATEGORY" });
    });


    describe("Subcategory onClick to insert text", () => {
      test("should call insertText when span is clicked", async () => {
        const { getByText } = renderWithProviders(<SubCategoryComponent
          categoryId={mockCategory.id} {...mockSubCategories[0]} />, { preloadedState: initialState });

        fireEvent.click(getByText(mockSubCategories[0].description));

        expect(insertAndHighlightText).toHaveBeenCalledWith(
          mockCategory.id,
          mockSubCategories[0].description
        );
      });
    });
  });
});
