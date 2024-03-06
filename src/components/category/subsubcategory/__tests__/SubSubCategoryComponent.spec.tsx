import SubSubCategoryComponent from "../SubSubCategoryComponent";
import React from "react";
import { within } from "@testing-library/react";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";

describe("SubSubCategoryComponent Test Suite", () => {
    const DEFAULT_PROPS = {
        backgroundColor: "backgroundColor",
        categoryId: "categoryId",
        description: "description",
        isAddingSubSubCategory: false,
        setIsAddingSubSubCategory: jest.fn(),
        shortCode: "shortCode",
        subCategoryId: "subCategoryId",
        subSubCategories: [{
            description: "description",
            id: "id",
            shortCode: "shortCode",
            subCategoryId: "subCategoryId"
        }]
    };

    const createComponent = (props = DEFAULT_PROPS) => (
        <SubSubCategoryComponent {...props} />
    );

    test("Initial render", () => {
        expect(true).toBe(true);
        const { container, debug } = renderWithProviders(createComponent(), { preloadedState: initialState });

        debug(container)
        expect(container.querySelectorAll(".subSubCategoryTable-125").length).toBe(1);
        expect(container.querySelectorAll(".subSubCategoryRow-123").length).toBe(1);
    });

    test("Initial render with isAddingSubSubCategory", () => {
        const { container, debug } = renderWithProviders(createComponent({
            ...DEFAULT_PROPS,
            isAddingSubSubCategory: true
        }), { preloadedState: initialState });

        debug(container)
        expect(container.querySelectorAll(".subSubCategoryTable-125").length).toBe(1);
        const rows = container.querySelectorAll(".subSubCategoryRow-123");
        expect(rows.length).toBe(2);
        expect(within(rows.item(0) as HTMLElement).queryByText("Opslaan")).not.toBeNull()
        expect(within(rows.item(1) as HTMLElement).queryByRole("img", { name: "Wijzigen" })).not.toBeNull()
    });

});