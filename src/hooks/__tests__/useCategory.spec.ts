import {
  addFormSupport,
  addMockAdapterSupport,
  renderHookWithProviders
} from "../../__tests__/utils/TestUtils";
import useCategory from "../useCategory";
import { initialState as STATE } from "../../redux/store";
import { useRef } from "react";
import { act } from "@testing-library/react";


describe("useCategory Test Suite", () => {
  let _unmount;

  const stateWithOnlyCategory = {
    ...STATE,
    modal: {
      ...STATE.modal,
      category: { code: "123", colour: "#000000", id: "123", title: "123" }
    }
  };

  const stateWithCategoryAndSubCategory = {
    ...STATE,
    modal: {
      ...STATE.modal,
      category: { code: "123", colour: "#000000", id: "123", title: "123" },
      subCategory: { categoryId: "123", description: "123" }
    }
  };

  afterEach(() => {
    _unmount && _unmount();
  });

  describe("categoryTitle & data", () => {

    test("default render", () => {
      const { result, unmount } = renderHookWithProviders(() => useCategory(), { preloadedState: STATE });
      _unmount = unmount;

      expect(result.current).toStrictEqual(expect.objectContaining({
        categoryTitle: undefined,
        data: undefined,
        handleSubmit: expect.any(Function)
      }));
    });

    test("state contains category & subCategory", () => {
      const {
        result,
        unmount
      } = renderHookWithProviders(() => useCategory(), { preloadedState: stateWithCategoryAndSubCategory });
      _unmount = unmount;

      expect(result.current).toStrictEqual(expect.objectContaining({
        categoryTitle: stateWithCategoryAndSubCategory.modal.category.title,
        data: stateWithCategoryAndSubCategory.modal.subCategory,
        handleSubmit: expect.any(Function)
      }));
    });

    test("state contains only category", () => {
      const {
        result,
        unmount
      } = renderHookWithProviders(() => useCategory(), { preloadedState: stateWithOnlyCategory });
      _unmount = unmount;

      expect(result.current).toStrictEqual(expect.objectContaining({
        categoryTitle: stateWithOnlyCategory.modal.category.title,
        data: stateWithOnlyCategory.modal.category,
        handleSubmit: expect.any(Function)
      }));
    });

  });

  describe("handleSubmit", () => {
    let axiosMock = addMockAdapterSupport();

    test("create subCategory", async () => {
      await act(() => {
        const { unmount } = renderHookWithProviders(async () => {
          const result = useCategory();
          const form = addFormSupport(new Map([
            ["description-input", "testDescription"]
          ]));
          const ref = useRef<HTMLFormElement>(form);

          axiosMock.onPost("http://localhost:3001/subCategories").reply(200, {});

          await result.handleSubmit(ref);

          expect(axiosMock.history.post.length).toBe(1);
          expect(axiosMock.history.post[0].data).toBe(JSON.stringify({
            categoryId: "123",
            description: "testDescription"
          }));
        }, { preloadedState: stateWithCategoryAndSubCategory });
        _unmount = unmount;
      });
    });

    test("update subCategory", async () => {
      await act(() => {
        const { unmount } = renderHookWithProviders(async () => {
          const result = useCategory();

          const form = addFormSupport(new Map([
            ["description-input", "testDescription"]
          ]));
          const ref = useRef<HTMLFormElement>(form);

          axiosMock.onPut("http://localhost:3001/subCategories/123").reply(200, {});

          await result.handleSubmit(ref);

          expect(axiosMock.history.put.length).toBe(1);
          expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
            categoryId: "123",
            description: "testDescription"
          }));
        }, {
          preloadedState: {
            ...stateWithCategoryAndSubCategory,
            modal: {
              ...stateWithCategoryAndSubCategory.modal,
              create: false,
              subCategory: {
                ...stateWithCategoryAndSubCategory.modal.subCategory,
                id: "123"
              }
            }
          }
        });
        _unmount = unmount;
      });
    });

  });

});
