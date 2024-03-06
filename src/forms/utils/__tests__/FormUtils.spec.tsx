import { render } from "@testing-library/react";
import Category from "../../../types/Category";
import SubCategory from "../../../types/SubCategory";
import { formatData, renderRow } from "../FormUtils";
import React from "react";
import { Table, TableBody } from "@fluentui/react-components";
import FieldType from "../../../types/FieldType";
import { DisplayableCategory } from "../FormUtils.types";
import { renderWithProviders } from "../../../__tests__/utils/TestUtils";
import { initialState } from "../../../redux/store";

describe("FormUtils Test Suite", () => {

    const category: Category = {
        code: "123",
        colour: "#000000",
        id: "1",
        subCategories: [],
        title: "CategoryComponent 1"
    };

    const partialSubCategory: SubCategory = {
        categoryId: "1",
        description: "testDescription",
        isFavorite: false
    };
    const subCategory: SubCategory = {
        ...partialSubCategory,
        description: "SubCategory 1",
        id: "1",
        isFavorite: false
    };

    const partialCategory: Category = {
        code: "",
        id: "1"
    };

    describe("formatData", () => {

        test("isCategory", () => {
            expect(formatData(category)).toEqual([{
                content: "CategoryComponent 1",
                id: "title",
                label: "Titel:",
                type: "input"
            },
                {
                    content: "123",
                    id: "code",
                    label: "Code:",
                    type: "input"
                },
                {
                    content: "#000000",
                    id: "colour",
                    label: "Kleur:",
                    type: "colour-input"
                }]);
        });

        test("isSubCategory partial with categoryTitle", () => {
            expect(formatData(partialSubCategory, category.title)).toEqual([
                { content: "[CategoryComponent 1]", id: "category", label: "Categorie:", type: "text" },
                { content: "testDescription", id: "description", label: "Beschrijving:", type: "textarea" }
            ]);
        });

        test("isSubCategory partial without categoryTitle", () => {
            expect(formatData(partialSubCategory)).toEqual([
                { content: "[Categorie onbekend]", id: "category", label: "Categorie:", type: "text" },
                { content: "testDescription", id: "description", label: "Beschrijving:", type: "textarea" }
            ]);
        });

        test("isSubCategory with categoryTitle", () => {
            expect(formatData(subCategory, category.title)).toEqual([
                { content: "[CategoryComponent 1]", id: "category", label: "Categorie:", type: "text" },
                { content: "SubCategory 1", id: "description", label: "Beschrijving:", type: "textarea" }
            ]);
        });

        test("isSubCategory without categoryTitle", () => {
            expect(formatData(subCategory)).toEqual([
                { content: "[Categorie onbekend]", id: "category", label: "Categorie:", type: "text" },
                { content: "SubCategory 1", id: "description", label: "Beschrijving:", type: "textarea" }
            ]);
        });

    });

    describe("renderRow", () => {

        const _renderRow = (data: Category | SubCategory, categoryTitle?: string) => (
            <Table>
                <TableBody>
                    {formatData(data, categoryTitle).map((data: DisplayableCategory) => renderRow(data))}
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

        const _checkValues = (container: HTMLElement, expectedValues: { fieldType: FieldType, value?: string }[]) => {
            const rows = container.querySelectorAll("tr");
            expect(rows).toHaveLength(expectedValues.length);

            expectedValues.forEach(({ fieldType, value }, index) => {
                if (fieldType === FieldType.INPUT) {
                    expect(rows.item(index).querySelector(fieldType)).toHaveValue(value);
                } else if (fieldType !== FieldType.COLOUR_INPUT) {
                    expect(rows.item(index).querySelector(fieldType)).toHaveTextContent(value);
                }
            });
        };

        const checkRows = (container: HTMLElement, expectedLabels: string[], expectedValues: {
            fieldType: FieldType,
            value?: string
        }[]) => {
            _checkLabels(container, expectedLabels);
            _checkValues(container, expectedValues);
        };

        test("renderRow partial SubCategory", () => {
            const { container } = render(_renderRow(partialSubCategory));

            checkRows(container,
                ["Categorie:", "Beschrijving:"],
                [
                    { fieldType: FieldType.SPAN, value: "[Categorie onbekend]" },
                    { fieldType: FieldType.TEXTAREA, value: "testDescription" }]
            );
        });

        test("renderRow SubCategory", () => {
            const { container } = render(_renderRow(subCategory, category.title));

            checkRows(container,
                ["Categorie:", "Beschrijving:"],
                [
                    { fieldType: FieldType.SPAN, value: "[CategoryComponent 1]" },
                    { fieldType: FieldType.TEXTAREA, value: "SubCategory 1" }]
            );
        });

        test("renderRow partial Category", () => {
            const { container } = renderWithProviders(_renderRow(partialCategory), { preloadedState: initialState });

            checkRows(container,
                ["Titel:", "Code:", "Kleur:"],
                [
                    { fieldType: FieldType.INPUT, value: "" },
                    { fieldType: FieldType.INPUT, value: "" },
                    { fieldType: FieldType.COLOUR_INPUT }]
            );
        });

        test("renderRow Category", () => {
            const { container } = renderWithProviders(_renderRow(category), { preloadedState: initialState });

            checkRows(container,
                ["Titel:", "Code:", "Kleur:"],
                [
                    { fieldType: FieldType.INPUT, value: "CategoryComponent 1" },
                    { fieldType: FieldType.INPUT, value: "123" },
                    { fieldType: FieldType.COLOUR_INPUT }]
            );
        });

    });

});