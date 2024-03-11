import getOfficeMock from "../../__tests__/utils/OfficeMockUtils";
import {
  getCategoryStyleName,
  getCategoryText,
  getSubCategoryText,
  insertText,
  insertTextWithUrl, readImport,
  writeExport
} from "../TextInsertUtils";
import SubCategory from "../../types/SubCategory";
import Category from "../../types/Category";

describe("TextInsertUtils Test Utils", () => {

  const category: Category = {
    code: "SP",
    colour: "red",
    id: "cat-1",
    subCategories: [],
    title: "Spelling"
  };

  const subCategory: SubCategory = {
    categoryId: category.id,
    description: "Spelling Engelse termen",
    isFavorite: false,
    shortCode: "1"
  };

  const originalStyle = "ORIGINAL";

  const _getOfficeMock = (mockReturnValue: boolean) => getOfficeMock(originalStyle, mockReturnValue ? ["found"] : [], true, false);
  const modalMiddlewareSpy = jest.spyOn(require("../../middleware/modal/ModalMiddleware"), "getCategory");

  describe("getCategoryText", () => {

    test.each([true, false])("click once, alwaysInsertText = %p", async (alwaysInsertText) => {
      _getOfficeMock(false);
      const expectedResult = " (Spelling) ";

      const actual = await getCategoryText(category.title, category.code, alwaysInsertText);

      expect(actual).toBe(expectedResult);
    });

    test.each([[true, " (Spelling) "], [false, " (SP) "]])("click more than once, alwaysInsertText = %p", async (alwaysInsertText, expected) => {
      _getOfficeMock(true);

      const actual = await getCategoryText(category.title, category.code, alwaysInsertText);

      expect(actual).toBe(expected);
    });

  });

  describe("getSubCategoryText", () => {

    modalMiddlewareSpy.mockImplementation(() => category);

    test.each([true, false])("click once, alwaysInsertText = %p", async (alwaysInsertText) => {
      _getOfficeMock(false);
      const expectedResult = " (Spelling - Spelling Engelse termen) ";

      const actual = await getSubCategoryText(category.id, subCategory.description, subCategory.shortCode, alwaysInsertText);

      expect(actual).toBe(expectedResult);
    });

    test.each([[true, " (Spelling - Spelling Engelse termen) "], [false, " (SP 1) "]])("click more than once, alwaysInsertText = %p", async (alwaysInsertText, expected) => {
      _getOfficeMock(true);

      const actual = await getSubCategoryText(category.id, subCategory.description, subCategory.shortCode, alwaysInsertText);

      expect(actual).toBe(expected);
    });

  });

  describe("getCategoryStyleName", () => {

    const _getOfficeMock = (isNullObject: boolean) => getOfficeMock(originalStyle, [], false, isNullObject);

    test("isNullObject", async () => {
      const { spyMap } = _getOfficeMock(true);
      const getStylesSpy = spyMap.get("getStyles");
      const addStyleSpy = spyMap.get("addStyle");
      const addTrackedObjectSpy = spyMap.get("addTrackedObject");

      const actual = await getCategoryStyleName(category.id, category.colour);

      expect(actual).toBe("cat1Style");
      expect(getStylesSpy).toHaveBeenCalledTimes(1);
      expect(addStyleSpy).toHaveBeenCalledTimes(1);
      expect(addTrackedObjectSpy).toHaveBeenCalledWith({
        font: { color: "black" },
        load: expect.anything(),
        shading: { backgroundPatternColor: "red" },
        style: "cat1Style"
      });
    });

    test("!isNullObject", async () => {
      const { spyMap } = _getOfficeMock(false);
      const getStylesSpy = spyMap.get("getStyles");
      const addStyleSpy = spyMap.get("addStyle");
      const addTrackedObjectSpy = spyMap.get("addTrackedObject");

      const actual = await getCategoryStyleName(category.id, category.colour);

      expect(actual).toBe("cat1Style");
      expect(getStylesSpy).toHaveBeenCalledTimes(1);
      expect(addStyleSpy).not.toHaveBeenCalled();
      expect(addTrackedObjectSpy).toHaveBeenCalledWith({
        font: { color: "black", highlightColor: "white" },
        isNullObject: false,
        load: expect.anything(),
        shading: { backgroundPatternColor: "red" }
      });
    });

  });

  describe("insertText", () => {

    const _getOfficeMock = (isEmpty: boolean) => getOfficeMock(originalStyle, [], isEmpty, false);

    test("range.isEmpty", async () => {
      const { contextMock, spyMap } = _getOfficeMock(true);
      const insertTextSpy = spyMap.get("insertText");

      await insertText(" (Spelling) ", "cat1Style");

      expect(insertTextSpy).not.toHaveBeenCalled();
      expect(contextMock.context.document.range.style).toBe(originalStyle);
    });

    test("!range.isEmpty", async () => {
      const { contextMock, spyMap } = _getOfficeMock(false);
      const insertTextSpy = spyMap.get("insertText");

      await insertText(" (Spelling) ", "cat1Style");

      expect(insertTextSpy).toHaveBeenCalledWith(" (Spelling) ", "After");
      expect(contextMock.context.document.range.style).toBe("cat1Style");
    });

  });

  describe("insertTextWithUrl", () => {

    const _getOfficeMock = (isEmpty: boolean) => getOfficeMock(originalStyle, [], isEmpty, false);

    test("range.isEmpty", async () => {
      const { contextMock, spyMap } = _getOfficeMock(true);
      const insertTextSpy = spyMap.get("insertText");
      const insertHtmlSpy = spyMap.get("insertHtml");

      await insertTextWithUrl(" (Spelling) ", "cat1Style", "www.test.be");

      expect(insertTextSpy).not.toHaveBeenCalled();
      expect(insertHtmlSpy).not.toHaveBeenCalled();
      expect(contextMock.context.document.range.style).toBe(originalStyle);
    });

    test("!range.isEmpty", async () => {
      const { contextMock, spyMap } = _getOfficeMock(false);
      const insertTextSpy = spyMap.get("insertText");
      const insertHtmlSpy = spyMap.get("insertHtml");

      await insertTextWithUrl(" (Spelling) ", "cat1Style", "www.test.be");

      expect(insertTextSpy).toHaveBeenCalledTimes(2);
      expect(insertTextSpy.mock.calls[0][0]).toBe(" (Spelling - ");
      expect(insertTextSpy.mock.calls[1][0]).toBe(") ");
      expect(insertHtmlSpy).toHaveBeenCalledWith("<a href=\"www.test.be\">www.test.be</a>", "After");
      expect(contextMock.context.document.range.style).toBe("cat1Style");
    });

  });

  describe("export", () => {

    const _getOfficeMock = (isEmpty: boolean) => getOfficeMock(originalStyle, [], isEmpty, false);

    test("writeExport", async () => {
      const { spyMap } = _getOfficeMock(false);
      const insertTextSpy = spyMap.get("insertText");

      await writeExport();

      expect(insertTextSpy).toHaveBeenCalledWith("{\"categories\":[],\"subCategories\":[],\"subSubCategories\":[]}", "End");
    });

    test("readImport", async () => {
      _getOfficeMock(false);

      const actual = await readImport();

      expect(actual).toStrictEqual({ "categories": [], "subCategories": [], "subSubCategories": [] });
    });
  });

});
