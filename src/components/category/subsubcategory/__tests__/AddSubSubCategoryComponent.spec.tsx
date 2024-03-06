import React from "react";
import AddSubSubCategoryComponent from "../AddSubSubCategoryComponent";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";
import { fireEvent } from "@testing-library/react";

describe("AddSubSubComponent Test Suite", () => {
    const setIsAddingSubSubCategory = jest.fn();

    const DEFAULT_PROPS = {
        backgroundColor: "#FFFFFF",
        setIsAddingSubSubCategory,
        subCategoryId: "subcat-1"
    };
    const createComponent = (props = DEFAULT_PROPS) => (<AddSubSubCategoryComponent {...props} />);

    test("Initial render", () => {
        const {
            queryByPlaceholderText,
            queryByText
        } = renderWithProviders(createComponent(), { preloadedState: initialState });

        expect(queryByPlaceholderText("Beschrijving")).not.toBeNull();
        expect(queryByPlaceholderText("https://www.voorbeeld.com")).not.toBeNull();

        expect(queryByText("Opslaan")).not.toBeNull();
        expect(queryByText("Annuleren")).not.toBeNull();
    });

    test("Clicking on the cancel button calls setIsAddingSubSubCategory", () => {
        const { getByText } = renderWithProviders(createComponent(), { preloadedState: initialState });

        getByText("Annuleren").click();

        expect(setIsAddingSubSubCategory).toHaveBeenCalledWith(false);
    });

    test("Clicking on the save button calls dispatch - no changes done", () => {
        const type = "SAVE_SUB_SUB_CATEGORY";

        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
        const spyInstance = jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "saveSubSubCategory").mockImplementation((args) => ({
            payload: args,
            type
        }));

        const { getByText } = renderWithProviders(createComponent(), { preloadedState: initialState });

        getByText("Opslaan").click();

        expect(dispatchMock.mock.calls[0][0].type).toBe(type);
        expect(spyInstance).toHaveBeenCalledWith({
            description: "Nieuwe ondertitel",
            subCategoryId: "subcat-1",
            url: ""
        });
        expect(setIsAddingSubSubCategory).toHaveBeenCalledWith(false);
    });

    test("Clicking on the save button calls dispatch - changes done", () => {
        const type = "SAVE_SUB_SUB_CATEGORY";

        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
        const spyInstance = jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "saveSubSubCategory").mockImplementation((args) => ({
            payload: args,
            type
        }));

        const {
            getByText,
            getByPlaceholderText
        } = renderWithProviders(createComponent(), { preloadedState: initialState });

        const newDescription = "Nieuwe beschrijving";
        const newUrl = "https://www.nieuweurl.com/";
        fireEvent.change(getByPlaceholderText("Beschrijving"), { target: { value: newDescription } });
        fireEvent.change(getByPlaceholderText("https://www.voorbeeld.com"), { target: { value: newUrl } });
        getByText("Opslaan").click();

        expect(dispatchMock.mock.calls[0][0].type).toBe(type);
        expect(spyInstance).toHaveBeenCalledWith({
            description: newDescription,
            subCategoryId: "subcat-1",
            url: newUrl
        });
        expect(setIsAddingSubSubCategory).toHaveBeenCalledWith(false);
    });

});