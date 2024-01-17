import CategoryReducer, { initialState } from "../category.slice";
import { AnyAction } from "@reduxjs/toolkit";
import Category from "../../../types/Category";

describe("CategoryReducer Test Suite", () => {
  const reducer = CategoryReducer;
  const CATEGORY: Category = { code: "some code", id: "123" };


  test("should return the initial state", () => {
    expect(reducer(initialState, {} as AnyAction)).toEqual({
      isLoading: false
    });
  });

  test("should handle loadDataFailure", () => {
    expect(reducer(initialState, { payload: "error", type: "category/loadDataFailure" })).toEqual({
      error: "error",
      isLoading: false
    });
  });

  test("should handle loadDataStart", () => {
    expect(reducer(initialState, { type: "category/loadDataStart" })).toEqual({
      isLoading: true
    });
  });

  test("should handle loadDataSuccess", () => {
    expect(reducer(initialState, { payload: [CATEGORY], type: "category/loadDataSuccess" })).toEqual({
      categories: [CATEGORY],
      isLoading: false
    });
  });

  test("should handle setCategory", () => {
    expect(reducer(initialState, { payload: CATEGORY, type: "category/setCategory" })).toEqual({
      ...initialState,
      category: CATEGORY
    });
  });

  test("should handle setCategoryId", () => {
    expect(reducer(initialState, { payload: "1", type: "category/setCategoryId" })).toEqual({
      ...initialState,
      categoryId: "1"
    });
  });

  test("should handle setColour", () => {
    expect(reducer(initialState, { payload: "#000000", type: "category/setColour" })).toEqual({
      ...initialState,
      colour: "#000000"
    });
  });

});
