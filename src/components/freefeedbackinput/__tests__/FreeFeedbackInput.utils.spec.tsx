import { OfficeMockObject } from "office-addin-mock";
import { insertFreeFeedback, insertFreeFeedbackAndHighlightText } from "../FreeFeedbackInput.utils";

const getOfficeMock = (originalStyle: string, mockReturnValue: string[], isEmpty: boolean, isNullObject: boolean) => {
    const contextMock = new OfficeMockObject({
        InsertLocation: {
            after: "After",
            end: "End"
        },
        // Mock the Word.InsertLocation enum.
        context: {
            document: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                addStyle: function(name: string, _: string) {
                    return {
                        font: {},
                        load: function() {
                            return this;
                        },
                        shading: {},
                        style: name
                    };
                },
                body: {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    search: jest.fn().mockImplementation((_) => ({
                        items: mockReturnValue,
                        load: function() {
                            return this;
                        }
                    }))
                },
                getSelection: function() {
                    return this.range;
                },
                getStyles: function() {
                    return this.styles;
                },
                range: {
                    font: {},
                    insertLocation: undefined,
                    insertText: function(text: string, insertLocation: unknown) {
                        this.text = text;
                        this.insertLocation = insertLocation;
                        return this;
                    },
                    isEmpty,
                    style: originalStyle,
                    text: "This is a test"
                },
                styles: {
                    getByNameOrNullObject: function() {
                        return {
                            font: {
                                color: "black",
                                highlightColor: "white"
                            },
                            isNullObject,
                            load: function() {
                                return this;
                            },
                            shading: {
                                backgroundPatternColor: "red"
                            }
                        };
                    },
                    load: function() {
                        return this;
                    }
                }
            }
        },
        // Mock the Word.run function.
        run: async function(callback) {
            await callback(this.context);
        }
    });
    contextMock.InsertLocation.load('after');
    contextMock.sync();

    // @ts-ignore
    global.Word = contextMock;

    const originalGetSelection = contextMock.context.document.getSelection;
    const getSelectionSpy = jest.spyOn(contextMock.context.document, "getSelection");
    getSelectionSpy.mockImplementation(originalGetSelection);
    const originalGetStyles = contextMock.context.document.getStyles;
    const getStylesSpy = jest.spyOn(contextMock.context.document, "getStyles");
    getStylesSpy.mockImplementation(originalGetStyles);
    const originalInsertText = contextMock.context.document.range.insertText;
    const insertTextSpy = jest.spyOn(contextMock.context.document.range, "insertText");
    insertTextSpy.mockImplementation(originalInsertText);
    const originalAddStyle = contextMock.context.document.addStyle;
    const addStyleSpy = jest.spyOn(contextMock.context.document, "addStyle");
    addStyleSpy.mockImplementation(originalAddStyle);

    const spyMap = new Map([
        ["addStyle", addStyleSpy],
        ["getSelection", getSelectionSpy],
        ["getStyles", getStylesSpy],
        ["insertText", insertTextSpy]
    ]);



    return {
        contextMock,
        spyMap
    };
};

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

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).not.toHaveBeenCalled();
            expect(contextMock.context.document.range.style).toBe(ORIGINAL_STYLE);
        });

        test("!isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, false);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - freeFeedback) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("isNullObject", async () => {
            const { contextMock, spyMap } = _getOfficeMock([], false, true);

            await insertFreeFeedbackAndHighlightText("categoryId", "freeFeedback");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).toHaveBeenCalledWith("categoryIdStyle", "Character");
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category - freeFeedback) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });

        test("no freeFeedback provided", async () => {
            const { contextMock, spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedbackAndHighlightText("categoryId", undefined);

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("getStyles")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("addStyle")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test Category) ", "After");
            expect(contextMock.context.document.range.style).toBe("categoryIdStyle");
        });
    });

    describe("insertFreeFeedback", () => {
        test("freeFeedback provided", async () => {
            const { spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedback("Test feedback");

            expect(spyMap.get("getSelection")).toHaveBeenCalledTimes(1);
            expect(spyMap.get("insertText")).toHaveBeenCalledWith(" (Test feedback) ", "End");
        });

        test("no freeFeedback provided", async () => {
            const { spyMap } = _getOfficeMock(["found"], false);

            await insertFreeFeedback("");

            expect(spyMap.get("getSelection")).not.toHaveBeenCalled();
            expect(spyMap.get("insertText")).not.toHaveBeenCalled();
        });
    });
});
