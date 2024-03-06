import ModalReducer, { initialState } from "../modal.slice";
import { AnyAction } from "@reduxjs/toolkit";

describe("ModalReducer Test Suite", () => {
    const reducer = ModalReducer;

    test("should return the initial state", () => {
        expect(reducer(initialState, {} as AnyAction)).toEqual({
            create: true,
            open: false,
            title: ""
        });
    });

    test("should handle setCategory", () => {
        expect(reducer(initialState, { payload: { id: "1", name: "test" }, type: "modal/setCategory" })).toEqual({
            category: { id: "1", name: "test" },
            create: true,
            open: false,
            title: ""
        });
    });

    test("should handle setCategoryId", () => {
        expect(reducer(initialState, { payload: "1", type: "modal/setCategoryId" })).toEqual({
            categoryId: "1",
            create: true,
            open: false,
            title: ""
        });
    });

    test("should handle setCreate", () => {
        expect(reducer(initialState, { payload: false, type: "modal/setCreate" })).toEqual({
            create: false,
            open: false,
            title: ""
        });
    });

    test("should handle setOpen", () => {
        expect(reducer(initialState, { payload: true, type: "modal/setOpen" })).toEqual({
            create: true,
            open: true,
            title: ""
        });
    });

    test("should handle setSubCategory", () => {
        expect(reducer(initialState, {
            payload: { categoryId: "1", code: "abc", description: "def" },
            type: "modal/setSubCategory"
        })).toEqual({
            create: true,
            open: false,
            subCategory: { categoryId: "1", code: "abc", description: "def" },
            title: ""
        });
    });

    test("should handle setTitle", () => {
        expect(reducer(initialState, { payload: "test", type: "modal/setTitle" })).toEqual({
            create: true,
            open: false,
            title: "test"
        });
    });

});