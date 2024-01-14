import { setCategory, setCreate, setOpen, setSubCategory, setTitle } from "../../../redux/modal/modal.slice";
import { addMockAdapterSupport, callAndCheckDispatchCalls } from "../../../__tests__/utils/TestUtils";
import {
  openCreateSubCategoryModal,
  openUpdateSubCategoryModal,
  saveSubCategory,
  updateSubCategory
} from "../ModalMiddleware";
import SubCategory from "../../../types/SubCategory";
import Category from "../../../types/Category";
import { setColour } from "../../../redux/category/category.slice";

describe("ModalMiddleware Test Suite", () => {

  const axiosMock = addMockAdapterSupport();
  const consoleSpy = jest.spyOn(console, "error");

  afterEach(consoleSpy.mockReset);
  afterAll(consoleSpy.mockRestore);

  describe("runOpenCreateSubCategoryModal", () => {

    const categoryId = "123";
    const URL = `http://localhost:3001/categories?id=${categoryId}`;

    const _callAndCheckDispatchCalls = async (dispatchCalls: string[]) => await callAndCheckDispatchCalls(openCreateSubCategoryModal(categoryId), dispatchCalls);

    test("happy path", async () => {
      const dispatchCalls = [
        setTitle.type,
        setCreate.type,
        setCategory.type,
        setSubCategory.type,
        setOpen.type
      ];
      axiosMock.onGet(URL).reply(200, [{
        colour: "#000000",
        id: "1",
        title: "testTitle"
      }]);

      await _callAndCheckDispatchCalls(dispatchCalls);
    });

    test("no data", async () => {
      const dispatchCalls = [];
      axiosMock.onGet(URL).reply(200, []);

      await _callAndCheckDispatchCalls(dispatchCalls);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Geen unieke categorie kunnen vinden.");
    });

    test("network error", async () => {
      const dispatchCalls = [];
      axiosMock.onGet(URL).networkError();

      await _callAndCheckDispatchCalls(dispatchCalls);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Network Error");
    });

  });

  describe("runOpenUpdateSubCategoryModal", () => {

    const subCategoryId = "123";
    const subCategory: SubCategory = {
      categoryId: "Some categoryId",
      description: "Some description",
      id: subCategoryId
    };
    const category: Category = {
      code: "Some code",
      colour: "#000000",
      id: "1",
      title: "testTitle"
    };
    const SUBCATEGORY_URL = `http://localhost:3001/subCategories?id=${subCategoryId}`
    const CATEGORY_URL = `http://localhost:3001/categories?id=${subCategory.categoryId}`;

    const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(openUpdateSubCategoryModal(subCategoryId), dispatchCalls);

    test("happy path", async () => {
      const dispatchCalls = [
        setTitle.type,
        setCreate.type,
        setCategory.type,
        setSubCategory.type,
        setOpen.type
      ];
      axiosMock.onGet(SUBCATEGORY_URL).reply(200, [subCategory]);
      axiosMock.onGet(CATEGORY_URL).reply(200, [category]);

      await _callAndCheckDispatchCalls(dispatchCalls);
    });

    test("no sub category data", async () => {
      const dispatchCalls = [];
      axiosMock.onGet(SUBCATEGORY_URL).reply(200, []);

      await _callAndCheckDispatchCalls(dispatchCalls);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Geen unieke subcategorie kunnen vinden.");
    });

    test("no category data", async () => {
      const dispatchCalls = [];
      axiosMock.onGet(SUBCATEGORY_URL).reply(200, [subCategory]);
      axiosMock.onGet(CATEGORY_URL).reply(200, []);

      await _callAndCheckDispatchCalls(dispatchCalls);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Geen unieke categorie kunnen vinden.");
    });

    test("network error", async () => {
      const dispatchCalls = [];
      axiosMock.onGet(SUBCATEGORY_URL).networkError();

      await _callAndCheckDispatchCalls(dispatchCalls);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Network Error");
    });

  });

  describe("saveSubCategory", () => {

    const URL = "http://localhost:3001/subCategories";
    const subCategory = {
      categoryId: "Some categoryId",
      code: "Some code",
      description: "Some description",
      id: "Some id"
    };

    const _callAndCheckDispatchCalls = async (dispatchCalls: (string | undefined)[]) => await callAndCheckDispatchCalls(saveSubCategory(subCategory), dispatchCalls);


    test("happy path", async () => {
      const dispatchCalls = [
        undefined,
        setOpen.type,
        setSubCategory.type,
        setTitle.type,
        setCategory.type,
        setColour.type
      ];

      axiosMock.onPost(URL, subCategory).reply(200);

      await _callAndCheckDispatchCalls(dispatchCalls);
    });

    test("network error", async () => {
      const dispatchCalls = [];

      axiosMock.onPost(URL, subCategory).networkError();

      await _callAndCheckDispatchCalls(dispatchCalls);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Network Error");
    });
  });

  describe("updateSubCategory", () => {

    const URL = "http://localhost:3001/subCategories/123";
    const subCategory = {
      categoryId: "Some categoryId",
      code: "Some code",
      description: "Some description",
      id: "123"
    };

    const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(updateSubCategory("123", subCategory), dispatchCalls);


    test("happy path", async () => {
      const dispatchCalls = [
        undefined,
        setOpen.type,
        setSubCategory.type,
        setTitle.type,
        setCategory.type,
        setColour.type
      ];

      axiosMock.onPut(URL, subCategory).reply(200);

      await _callAndCheckDispatchCalls(dispatchCalls);
    });

    test("network error", async () => {
      const dispatchCalls = [];

      axiosMock.onPut(URL, subCategory).networkError();

      await _callAndCheckDispatchCalls(dispatchCalls);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith("Network Error");
    });
  });

});
