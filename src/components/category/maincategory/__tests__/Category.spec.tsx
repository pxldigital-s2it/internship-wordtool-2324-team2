import { CategoryProps } from "../Category.types";
import Category from "../Category";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { categoryClassNames } from "../Category.styles";

describe('Category Test Suite', () => {
  const DEFAULT_PROPS: CategoryProps = {
    id: 1,
    name: 'Category',
    sections: 2
  };

  const createComponent = (props: CategoryProps) => {
    return <Category {...props} />;
  }

  test('Initial render', () => {
    const { getByText } = render(createComponent(DEFAULT_PROPS));

    expect(getByText(`${DEFAULT_PROPS.name} (${DEFAULT_PROPS.sections})`)).toBeInTheDocument();
  });

  test('Clicking on the header toggles the content', () => {
    const { container, getByText } = render(createComponent(DEFAULT_PROPS));

    expect(container.querySelector(`div.${categoryClassNames.categoryContent}`)).not.toBeInTheDocument();
    expect(container.querySelector('i[data-icon-name="ChevronRight"]')).toBeInTheDocument();

    fireEvent.click(getByText(`${DEFAULT_PROPS.name} (${DEFAULT_PROPS.sections})`));

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

});
