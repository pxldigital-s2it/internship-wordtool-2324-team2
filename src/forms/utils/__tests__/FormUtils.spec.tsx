import { render } from "@testing-library/react";
import Category from "../../../types/Category";
import SubCategory, { DisplayableSubCategory } from "../../../types/SubCategory";
import { formatData, renderRow } from "../FormUtils";
import React from "react";
import { Table, TableBody } from "@fluentui/react-components";
import FieldType from "../../../types/FieldType";

describe("FormUtils Test Suite", () => {

  const category: Category = {
    colour: "#000000",
    id: "1",
    title: "Category 1"
  };
  const partialSubCategory: SubCategory = {
    categoryId: "1",
    code: null
  };
  const subCategory: SubCategory = {
    ...partialSubCategory,
    code: "1",
    description: "SubCategory 1",
    id: "1"
  };

  describe("formatData", () => {

    // TODO: isCategory
    test("isCategory", () => {
      expect(formatData(category)).toEqual([{}]);
    });

    test("isSubCategory partial with categoryTitle", () => {
      expect(formatData(partialSubCategory, category.title)).toEqual([
        { content: "[Category 1]", id: "category", label: "Categorie:", type: "text" },
        { content: "", id: "description", label: "Beschrijving:", type: "textarea" },
        { content: "", id: "code", label: "Code:", type: "input" }
      ]);
    });

    test("isSubCategory partial without categoryTitle", () => {
      expect(formatData(partialSubCategory)).toEqual([
        { content: "[Categorie onbekend]", id: "category", label: "Categorie:", type: "text" },
        { content: "", id: "description", label: "Beschrijving:", type: "textarea" },
        { content: "", id: "code", label: "Code:", type: "input" }
      ]);
    });

    test("isSubCategory with categoryTitle", () => {
      expect(formatData(subCategory, category.title)).toEqual([
        { content: "[Category 1]", id: "category", label: "Categorie:", type: "text" },
        { content: "SubCategory 1", id: "description", label: "Beschrijving:", type: "textarea" },
        { content: "1", id: "code", label: "Code:", type: "input" }
      ]);
    });

    test("isSubCategory without categoryTitle", () => {
      expect(formatData(subCategory)).toEqual([
        { content: "[Categorie onbekend]", id: "category", label: "Categorie:", type: "text" },
        { content: "SubCategory 1", id: "description", label: "Beschrijving:", type: "textarea" },
        { content: "1", id: "code", label: "Code:", type: "input" }
      ]);
    });

  });

  describe("renderRow", () => {

    const _renderRow = (data: SubCategory, categoryTitle?: string) => (
      <Table>
        <TableBody>
          {formatData(data, categoryTitle).map((data: DisplayableSubCategory) => renderRow(data))}
        </TableBody>
      </Table>
    );

    const _checkLabels = (container: HTMLElement, expectedLabels: string[]) => {
      const rows = container.querySelectorAll("tr");
      expect(rows).toHaveLength(expectedLabels.length);

      expectedLabels.forEach((label, index) => {
        expect(rows.item(index).querySelector(FieldType.LABEL)).toHaveTextContent(label);
      });
    };

    const _checkValues = (container: HTMLElement, expectedValues: { fieldType: FieldType, value: string }[]) => {
      const rows = container.querySelectorAll("tr");
      expect(rows).toHaveLength(expectedValues.length);

      expectedValues.forEach(({ fieldType, value }, index) => {
        if (fieldType === FieldType.INPUT) {
          expect(rows.item(index).querySelector(fieldType)).toHaveValue(value);
        } else {
          expect(rows.item(index).querySelector(fieldType)).toHaveTextContent(value);
        }
      });
    };

    const checkRows = (container: HTMLElement, expectedLabels: string[], expectedValues: {
      fieldType: FieldType,
      value: string
    }[]) => {
      _checkLabels(container, expectedLabels);
      _checkValues(container, expectedValues);
    };

    test("renderRow partial SubCategory", () => {
      const { container } = render(_renderRow(partialSubCategory));

      checkRows(container,
        ["Categorie:", "Beschrijving:", "Code:"],
        [
          { fieldType: FieldType.SPAN, value: "[Categorie onbekend]" },
          { fieldType: FieldType.TEXTAREA, value: "" },
          { fieldType: FieldType.INPUT, value: "" }]
      );
    });

    test("renderRow SubCategory", () => {
      const { container } = render(_renderRow(subCategory, category.title));

      checkRows(container,
        ["Categorie:", "Beschrijving:", "Code:"],
        [
          { fieldType: FieldType.SPAN, value: "[Category 1]" },
          { fieldType: FieldType.TEXTAREA, value: "SubCategory 1" },
          { fieldType: FieldType.INPUT, value: "1" }]
      );
    });

  });

});
