import { insertFreeFeedback, insertFreeFeedbackAndHighlightText } from "../FreeFeedbackInput.utils";
import { setRangesWithUrl } from "../../../utils/TextInsertUtils";
import getOfficeMock from "../../../utils/OfficeMockUtils";
import {waitFor} from "@testing-library/react";

jest.mock("../../../utils/TextInsertUtils", () => ({
    ...jest.requireActual("../../../utils/TextInsertUtils"),
    setRangesWithUrl: jest.fn()
}));

describe("FreeFeedbackInput.utils Test Suite", () => {

    const ORIGINAL_STYLE = "ORIGINAL";
    jest.spyOn(require("../../../middleware/modal/ModalMiddleware"), "getCategory").mockImplementation(() => (
        {
            code: "test",
            colour: "red",
            id: "cat-1",
            subCategories: [],
            title: "Test Category"
        }
    ));

    const _getOfficeMock = (mockReturnValue: string[], isEmpty: boolean, isNullObject: boolean = false) => getOfficeMock(ORIGINAL_STYLE, mockReturnValue, isEmpty, isNullObject);

    describe("insertFreeFeedbackAndHighlightText", () => {
        test("range.isEmpty", async () => {

            const { contextMock, spyMap } = _getOfficeMock(["found"], true);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback", "");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).not.toHaveBeenCalled();
            expect(setRangesWithUrl).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe(ORIGINAL_STYLE);
        });

        test("!isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, false);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback", "");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - freeFeedback) ", "After");
            expect(setRangesWithUrl).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, true);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback", "");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).toHaveBeenCalledWith("categoryIdStyle", "Character");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - freeFeedback) ", "After");
            expect(setRangesWithUrl).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("no freeFeedback provided", async () => {
            const { contextMock, spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedbackAndHighlightText("categoryId", undefined, "");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category) ", "After");
            expect(setRangesWithUrl).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("with url", async () => {
            const { contextMock, spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedbackAndHighlightText("categoryId", undefined, "https://www.google.com");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category ", "After");
            expect(spyMap.get("insertHtml")).toHaveBeenCalledWith(`<a href="https://www.google.com">https://www.google.com</a>`, "After");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(") ", "After");
            //expect(setRangesWithUrl).toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("with url and freeFeedback", async () => {
            const { contextMock, spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback", "https://www.google.com");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - freeFeedback ", "After");
            expect(spyMap.get("insertHtml")).toHaveBeenCalledWith(`<a href="https://www.google.com">https://www.google.com</a>`, "After");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(") ", "After");
            //expect(setRangesWithUrl).toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });
    });

    describe("insertFreeFeedback", () => {
        test("freeFeedback provided", async () => {
            const { spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedback("Test feedback", "");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test feedback) ", "End");
            expect(setRangesWithUrl).not.toHaveBeenCalled();
        });

        test("no freeFeedback provided", async () => {
            const { spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedback("", "");

            expect(spyMap.get("getSelection")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).not.toHaveBeenCalled();
            expect(spyMap.get("insertHtml")).not.toHaveBeenCalled();
            expect(setRangesWithUrl).not.toHaveBeenCalled();
        });

        test("with url", async () => {
            const { spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedback("Test feedback", "https://www.google.com");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test feedback ", "End");
            expect(spyMap.get("insertHtml")).toHaveBeenCalledWith(`<a href="https://www.google.com">https://www.google.com</a>`, "End");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(") ", "End");
            expect(setRangesWithUrl).toHaveBeenCalled();
        });
    });
});
