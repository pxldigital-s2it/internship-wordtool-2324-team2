import React from "react";
import SubCategoryComponent from "../SubCategoryComponent";
import { render } from "@testing-library/react";

describe('SubCategoryComponent Test Suite', () => {
    test('Initial render', () => {
      const { getByText } = render(<SubCategoryComponent categoryId={"category_1"}/>);
      expect(getByText('SubCategoryComponent Content')).toBeInTheDocument();
    });
});
