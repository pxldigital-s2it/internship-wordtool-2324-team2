import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { categoryClassNames } from "../CategoryComponent.styles";
import Category from "../../../../types/Category";
import SubCategory from "../../../../types/SubCategory";
import { CategoryComponent } from "../../../index";

describe('CategoryComponent Test Suite', () => {
  const DEFAULT_PROPS: { id: string; title: string, code: Nullable<string>, colour: string, subCategories: SubCategory[] } = {
    code: null,
    colour: "#" + Math.floor(Math.random() * 16777215).toString(16),  // random colour
    id: Math.random().toString(36), // random id
    subCategories: [],
    title: "Category"
  };

  const createComponent = (props: Category) => {
    return <CategoryComponent {...props} />;
  }

  test('Initial render', () => {
    const { getByText } = render(createComponent(DEFAULT_PROPS));

    expect(getByText(`${DEFAULT_PROPS.title}`)).toBeInTheDocument();
  });

  test('Clicking on the header toggles the content', () => {
    const { container, getByText } = render(createComponent(DEFAULT_PROPS));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).not.toBeInTheDocument();
    expect(container.querySelector('i[data-icon-name="ChevronRight"]')).toBeInTheDocument();

    fireEvent.click(getByText(`${DEFAULT_PROPS.title}`));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).toBeInTheDocument();
    expect(container.querySelector('i[data-icon-name="ChevronDown"]')).toBeInTheDocument();
  });

  test('Clicking on the icon toggles the content', () => {
    const { container } = render(createComponent(DEFAULT_PROPS));

    expect(container.querySelector(`.${categoryClassNames.categoryContent}`)).not.toBeInTheDocument();
    expect(container.querySelector('i[data-icon-name="ChevronRight"]')).toBeInTheDocument();

    fireEvent.click(container.querySelector('i[data-icon-name="ChevronRight"]'));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).toBeInTheDocument();
    expect(container.querySelector('i[data-icon-name="ChevronDown"]')).toBeInTheDocument();
  });

  test('Right-clicking on the header opens the context menu with correct options', () => {
    const { getByText, queryByText } = render(createComponent(DEFAULT_PROPS));

    // Simulate right-click on the header
    fireEvent.contextMenu(getByText(`${DEFAULT_PROPS.title}${DEFAULT_PROPS.subCategories.length > 0 ? ` (${DEFAULT_PROPS.subCategories.length})` : ''}`));

    // Check if the context menu opens with the correct options
    expect(queryByText('Bewerken')).toBeInTheDocument();
    expect(queryByText('Verwijderen')).toBeInTheDocument();
  });

});
