/*import { insertAndHighlightText } from "../SubCategoryComponent.utils";
import getOfficeMock from "../../../../utils/OfficeMockUtils";

describe("SubCategoryComponent.utils Test Suite", () => {

    const ORIGINAL_STYLE = "ORIGINAL";
    jest.spyOn(require("../../../../middleware/modal/ModalMiddleware"), "getCategory").mockImplementation(() => (
        {
            code: "test",
            colour: "red",
            id: "cat-1",
            subCategories: [],
            title: "Test Category"
        }
    ));

    describe("insertAndHighlightText", () => {

        const _getOfficeMock = (mockReturnValue: string[], isEmpty: boolean, isNullObject: boolean = false) => getOfficeMock(ORIGINAL_STYLE, mockReturnValue, isEmpty, isNullObject);

        test("range.isEmpty", async () => {

            const { contextMock, spyMap } = _getOfficeMock(["found"], true);

            await insertAndHighlightText("categoryId", "description", "shortCode");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe(ORIGINAL_STYLE);
        });

        test("!isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, false);

            await insertAndHighlightText("categoryId", "description", "shortCode");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - description) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, true);

            await insertAndHighlightText("categoryId", "description", "shortCode");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).toHaveBeenCalledWith("categoryIdStyle", "Character");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - description) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("searchResults.items?.length", async () => {
            const { contextMock, spyMap } = _getOfficeMock(["found"], false);

            await insertAndHighlightText("categoryId", "description", "shortCode");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (test shortCode) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });
    });
});*/
