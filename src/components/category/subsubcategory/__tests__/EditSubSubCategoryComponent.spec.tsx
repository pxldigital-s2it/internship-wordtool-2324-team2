import React from "react";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import EditSubSubCategoryComponent from "../EditSubSubCategoryComponent";
import { initialState } from "../../../../redux/store";
import { fireEvent } from "@testing-library/react";

describe("EditSubSubCategoryComponent Test Suite", () => {
    const setIsEditing = jest.fn();
    const DEFAULT_PROPS = {
        setIsEditing,
        subSubCategory: {
            description: "description",
            id: "1",
            subCategoryId: "subcat-1",
            url: "url"
        }
    }

    const PROPS_NO_URL = {
        setIsEditing,
        subSubCategory: {
            description: "description",
            id: "1",
            subCategoryId: "subcat-1",
            url: undefined
        }
    }

    const createComponent = (props = DEFAULT_PROPS) => (<EditSubSubCategoryComponent {...props} />);

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

    test("Clicking on the cancel button calls setIsEditing", () => {
        const { getByText } = renderWithProviders(createComponent(), { preloadedState: initialState });

        getByText("Annuleren").click();

        expect(setIsEditing).toHaveBeenCalledWith(false);
    });

    test("Clicking on the save button calls dispatch - no changes done", () => {
        const type = "UPDATE_SUB_SUB_CATEGORY";

        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
        const spyInstance = jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "updateSubSubCategory").mockImplementation((args) => ({
            payload: args,
            type
        }));

        const { getByText } = renderWithProviders(createComponent(), { preloadedState: initialState });

        getByText("Opslaan").click();

        expect(dispatchMock.mock.calls[0][0].type).toBe(type);
        expect(spyInstance).toHaveBeenCalledWith("1", {
            description: "description",
            url: "url"
        });
        expect(setIsEditing).toHaveBeenCalledWith(false);
    });

    test("Clicking on the save button calls dispatch - changes done", () => {
        const type = "UPDATE_SUB_SUB_CATEGORY";

        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
        const spyInstance = jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "updateSubSubCategory").mockImplementation((args) => ({
            payload: args,
            type
        }));

        const {
            getByText,
            getByPlaceholderText
        } = renderWithProviders(createComponent(), { preloadedState: initialState });

        const newDescription = "new description";
        const newUrl = "https://www.nieuweurl.be";
        fireEvent.change(getByPlaceholderText("Beschrijving"), { target: { value: newDescription } })
        fireEvent.change(getByPlaceholderText("https://www.voorbeeld.com"), { target: { value: newUrl } });

        getByText("Opslaan").click();

        expect(dispatchMock.mock.calls[0][0].type).toBe(type);
        expect(spyInstance).toHaveBeenCalledWith("1", {
            description: newDescription,
            url: newUrl
        });
        expect(setIsEditing).toHaveBeenCalledWith(false);
    });

    test("Clicking on the save button without url calls dispatch - changes done", () => {
        const type = "UPDATE_SUB_SUB_CATEGORY";

        const dispatchMock = jest.fn();
        jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
        const spyInstance = jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "updateSubSubCategory").mockImplementation((args) => ({
            payload: args,
            type
        }));

        const {
            getByText,
            getByPlaceholderText
        } = renderWithProviders(createComponent(PROPS_NO_URL), { preloadedState: initialState });

        const newDescription = "new description";
        fireEvent.change(getByPlaceholderText("Beschrijving"), { target: { value: newDescription } });

        getByText("Opslaan").click();

        expect(dispatchMock.mock.calls[0][0].type).toBe(type);
        expect(spyInstance).toHaveBeenCalledWith("1", {
            description: newDescription
        });
        expect(setIsEditing).toHaveBeenCalledWith(false);
    });

});