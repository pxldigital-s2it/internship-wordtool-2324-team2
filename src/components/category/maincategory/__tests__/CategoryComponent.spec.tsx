import React from "react";
import { fireEvent, Matcher, SelectorMatcherOptions } from "@testing-library/react";
import { categoryClassNames } from "../CategoryComponent.styles";
import Category from "../../../../types/Category";
import SubCategory from "../../../../types/SubCategory";
import { CategoryComponent } from "../../../index";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";
import { categoryContextMenu } from "../../../../patterns/observer";

describe("CategoryComponent Test Suite", () => {
  const DEFAULT_PROPS: {
    id: string;
    title: string,
    code: Nullable<string>,
    colour: string,
    subCategories: SubCategory[]
  } = {
    code: null,
    colour: "#" + Math.floor(Math.random() * 16777215).toString(16),  // random colour
    id: Math.random().toString(36), // random id
    subCategories: [],
    title: "Category"
  };

  const createComponent = (props: Category) => {
    return <CategoryComponent {...props} />;
  };

  test("Initial render", () => {
    const { getByText } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

    expect(getByText(`${DEFAULT_PROPS.title}`)).toBeInTheDocument();
  });

  test("Clicking on the header toggles the content", () => {
    const {
      container,
      getByText
    } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).not.toBeInTheDocument();
    expect(container.querySelector("i[data-icon-name=\"ChevronRight\"]")).toBeInTheDocument();

    fireEvent.click(getByText(`${DEFAULT_PROPS.title}`));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).toBeInTheDocument();
    expect(container.querySelector("i[data-icon-name=\"ChevronDown\"]")).toBeInTheDocument();
  });

  test("Clicking on the icon toggles the content", () => {
    const { container } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

    expect(container.querySelector(`.${categoryClassNames.categoryContent}`)).not.toBeInTheDocument();
    expect(container.querySelector("i[data-icon-name=\"ChevronRight\"]")).toBeInTheDocument();

    fireEvent.click(container.querySelector("i[data-icon-name=\"ChevronRight\"]"));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).toBeInTheDocument();
    expect(container.querySelector("i[data-icon-name=\"ChevronDown\"]")).toBeInTheDocument();
  });

  describe("CategoryComponent Context Menu", () => {
    const dispatchMock= jest.fn();
    jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
    jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "openCreateSubCategoryModal").mockImplementation((id) => ({ payload: id, type: "OPEN_CREATE_SUB_CATEGORY_MODAL" }));
    jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "openUpdateCategoryModal").mockImplementation((id) => ({ payload: id, type: "OPEN_UPDATE_CATEGORY_MODAL" }));
    jest.spyOn(require("../../../../middleware/category/CategoryMiddleware"), "deleteCategory").mockImplementation((id) => ({ payload: id, type: "DELETE_CATEGORY" }))
    const openContextMenu = (getByText: { (id: Matcher, options?: SelectorMatcherOptions): HTMLElement; (arg0: string): Element | Node | Document | Window; }) => {
      fireEvent.contextMenu(getByText(`${DEFAULT_PROPS.title}${DEFAULT_PROPS.subCategories.length > 0 ? ` (${DEFAULT_PROPS.subCategories.length})` : ""}`));
    }

    test('Right-clicking on the header opens the context menu with correct options', () => {
      const {
        getByText,
        queryByText
      } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

      // Simulate right-click on the header
      openContextMenu(getByText);

      // Check if the context menu opens with the correct options
      expect(queryByText(categoryContextMenu.getEditLabel())).toBeInTheDocument();
      expect(queryByText(categoryContextMenu.getDeleteLabel())).toBeInTheDocument();
    });

    test("openCreateSubCategoryModal is called when clicking on the 'Subcategorie toevoegen' option", () => {
      const {
        getByText
      } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

      // Simulate right-click on the header
      openContextMenu(getByText);

      fireEvent.click(getByText(categoryContextMenu.getSubCategoryLabel()));

      expect(dispatchMock).toHaveBeenCalledWith({ payload: DEFAULT_PROPS, type: "OPEN_CREATE_SUB_CATEGORY_MODAL" })
    });

    test("openUpdateCategoryModal is called when clicking on the 'Bewerken' option", () => {
      const {
        getByText
      } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

      // Simulate right-click on the header
      openContextMenu(getByText);

      fireEvent.click(getByText(categoryContextMenu.getEditLabel()));

      expect(dispatchMock).toHaveBeenCalledWith({ payload: DEFAULT_PROPS, type: "OPEN_UPDATE_CATEGORY_MODAL" })
    });

    
    test("deleteCategory is called when clicking on the 'Verwijderen' option", () => {
      const {
        getByText
      } = renderWithProviders(createComponent(DEFAULT_PROPS), { preloadedState: initialState });

      // Simulate right-click on the header
      openContextMenu(getByText);

      fireEvent.click(getByText(categoryContextMenu.getDeleteLabel()));

      expect(dispatchMock).toHaveBeenCalledWith( { payload: DEFAULT_PROPS.id, type: "DELETE_CATEGORY" });
    });

  });

});
