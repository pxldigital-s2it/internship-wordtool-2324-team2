import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CategoryComponent from "../../maincategory/CategoryComponent";
import Category from "../../../../types/Category";
import SubCategory from "../../../../types/SubCategory";
import { categoryClassNames } from "../../maincategory/CategoryComponent.styles";
import SubCategoryComponent from "../SubCategoryComponent";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";

describe('SubCategoryComponent Integration Test Suite', () => {
  const mockSubCategories: SubCategory[] = [
    {
      categoryId: "cat-1",
      description: "SubCategory 1 Description",
      id: "subcat-1"
    },
    {
      categoryId: "cat-1",
      description: "SubCategory 2 Description",
      id: "subcat-2"
    }
  ];

  const mockCategory: Category = {
    id: "cat-1",
    subCategories: mockSubCategories,
    title: "Test Category"
  };
  test('Initial render', () => {
    const { getByText } = renderWithProviders(<SubCategoryComponent key={mockSubCategories[0].id} {...mockSubCategories[0]} />, { preloadedState: initialState });
    expect(getByText(mockSubCategories[0].description)).toBeInTheDocument();
  });

  test('Context menu opens on right click', () => {
    const { getByText } = renderWithProviders(<SubCategoryComponent categoryId={mockCategory.id} {...mockSubCategories[0]} />, { preloadedState: initialState });

    const subCategoryComponentContent = getByText(mockSubCategories[0].description);

    fireEvent.contextMenu(subCategoryComponentContent);

    const contextMenuWijzigen = getByText('Wijzigen');
    const contextMenuVerwijderen = getByText('Verwijderen');
    expect(contextMenuWijzigen).toBeInTheDocument();
    expect(contextMenuVerwijderen).toBeInTheDocument();
  });
  
  test('SubCategoryComponent renders within CategoryComponent', () => {
    const { getByText, queryByText, container } = renderWithProviders(<CategoryComponent {...mockCategory} />, { preloadedState: initialState });
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
});
