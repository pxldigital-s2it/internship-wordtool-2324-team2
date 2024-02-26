import {OfficeMockObject} from "office-addin-mock";

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

export default getOfficeMock;