import {
    addFormSupport,
    addStorageMockSupport,
    renderHookWithProviders
} from "../../__tests__/utils/TestUtils";
import useCategory from "../useCategory";
import { initialState as STATE } from "../../redux/store";
import { useRef } from "react";
import { act } from "@testing-library/react";
import { StorageKeys } from "../../utils/StorageUtils.types";


describe("useCategory Test Suite", () => {
    let _unmount;

    const stateWithOnlyCategory = {
        ...STATE,
        modal: {
            ...STATE.modal,
            category: { code: "123", colour: "#FFFFFF", id: "123", title: "123" }
        }
    };

    const stateWithCategoryAndSubCategory = {
        ...STATE,
        modal: {
            ...STATE.modal,
            category: { code: "123", colour: "#FFFFFF", id: "123", title: "123" },
            subCategory: { categoryId: "123", description: "123", isFavorite: false }
        }
    };

    const stateWithCategoryWithHighContrast = {
        ...STATE,
        category: {
            ...STATE.category,
            colour: "#FFFFFF"
        },
        modal: {
            ...STATE.modal,
            category: { code: "123", colour: "#FFFFFF", id: "123", title: "123" }
        }
    };

    const stateWithCategoryWithLowContrast = {
        ...STATE,
        category: {
            ...STATE.category,
            colour: "#000000"
        },
        modal: {
            ...STATE.modal,
            category: { code: "123", colour: "#000000", id: "123", title: "123" }
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
        const storageMock = addStorageMockSupport();

        afterEach(jest.resetAllMocks)

        test("create subCategory", async () => {
            act(() => {
                const { unmount } = renderHookWithProviders(async () => {
                    const result = useCategory();
                    const form = addFormSupport(new Map([
                        ["description-input", "testDescription"]
                    ]));
                    const ref = useRef<HTMLFormElement>(form);

                    const spyInstance = storageMock("save", () => {
                    });

                    await result.handleSubmit(ref);

                    expect(spyInstance).toHaveBeenCalledTimes(1);
                    expect(spyInstance).toHaveBeenCalledWith(StorageKeys.SUBCATEGORY, {
                        categoryId: "123",
                        description: "testDescription",
                        isFavorite: false
                    });
                }, { preloadedState: stateWithCategoryAndSubCategory });
                _unmount = unmount;
            });
        });

        test("update subCategory", async () => {
            act(() => {
                const { unmount } = renderHookWithProviders(async () => {
                    const result = useCategory();

                    const form = addFormSupport(new Map([
                        ["description-input", "testDescription"]
                    ]));
                    const ref = useRef<HTMLFormElement>(form);

                    const spyInstance = storageMock("update", () => {
                    });

                    await result.handleSubmit(ref);

                    expect(spyInstance).toHaveBeenCalledTimes(1);
                    expect(spyInstance).toHaveBeenCalledWith(StorageKeys.SUBCATEGORY, "123", {
                        categoryId: "123",
                        description: "testDescription",
                        isFavorite: false
                    });
                }, {
                    preloadedState: {
                        ...stateWithCategoryAndSubCategory,
                        modal: {
                            ...stateWithCategoryAndSubCategory.modal,
                            create: false,
                            subCategory: {
                                ...stateWithCategoryAndSubCategory.modal.subCategory,
                                id: "123",
                                isFavorite: false
                            }
                        }
                    }
                });
                _unmount = unmount;
            });
        });

        test("create category", async () => {
            act(() => {
                const { unmount } = renderHookWithProviders(async () => {
                    const result = useCategory();
                    const form = addFormSupport(new Map([
                        ["code-input", "testCode"]
                    ]));
                    const ref = useRef<HTMLFormElement>(form);

                    const spyInstance = storageMock("save", () => {
                    });

                    await result.handleSubmit(ref);

                    expect(spyInstance).toHaveBeenCalledTimes(1);
                    expect(spyInstance).toHaveBeenCalledWith(StorageKeys.CATEGORY, {
                        code: "testCode"
                    });
                }, { preloadedState: stateWithOnlyCategory });
                _unmount = unmount;
            });
        });

        test("update category", async () => {
            act(() => {
                const { unmount } = renderHookWithProviders(async () => {
                    const result = useCategory();

                    const form = addFormSupport(new Map([
                        ["code-input", "testCode"]
                    ]));
                    const ref = useRef<HTMLFormElement>(form);

                    const spyInstance = storageMock("update", () => {
                    });

                    await result.handleSubmit(ref);

                    expect(spyInstance).toHaveBeenCalledTimes(1);
                    expect(spyInstance).toHaveBeenCalledWith(StorageKeys.CATEGORY, "123", { code: "testCode" });
                }, {
                    preloadedState: {
                        ...stateWithOnlyCategory,
                        modal: {
                            ...stateWithOnlyCategory.modal,
                            create: false
                        }
                    }
                });
                _unmount = unmount;
            });
        });


        describe("ContractWarning", () => {
            const type = "OPEN_CONTRAST_WARNING_ALERT";

            test("If low contrast when handle submit then show contrast warning popup", async () => {
                const mockDispatch = jest.fn();
                jest.spyOn(require("../../redux/hooks"), "useAppDispatch").mockImplementation(() => mockDispatch);
                jest.spyOn(require("../../middleware/contrastwarningalert/ContrastWarningAlertMiddleware"), "openContrastWarningAlert").mockImplementation(() => ({ type }));

                act(() => {
                    const { unmount } = renderHookWithProviders(async () => {
                        const result = useCategory();

                        const form = addFormSupport(new Map([
                            ["code-input", "testCode"]
                        ]));
                        const ref = useRef<HTMLFormElement>(form);

                        await result.handleSubmit(ref);

                        expect(mockDispatch).toHaveBeenCalledTimes(1);
                        expect(mockDispatch.mock.calls[0][0].type).toEqual(type);
                    }, {
                        preloadedState: {
                            ...stateWithCategoryWithLowContrast,
                            modal: {
                                ...stateWithCategoryWithLowContrast.modal,
                                create: false
                            }
                        }
                    });
                    _unmount = unmount;
                });
            });

            test("If high contrast when handle submit then show contrast warning popup", async () => {

                const mockDispatch = jest.fn();
                jest.spyOn(require("../../redux/hooks"), "useAppDispatch").mockImplementation(() => mockDispatch);
                jest.spyOn(require("../../middleware/contrastwarningalert/ContrastWarningAlertMiddleware"), "openContrastWarningAlert").mockImplementation(() => ({ type }));

                act(() => {
                    const { unmount } = renderHookWithProviders(async () => {
                        const result = useCategory();

                        const form = addFormSupport(new Map([
                            ["code-input", "testCode"]
                        ]));
                        const ref = useRef<HTMLFormElement>(form);

                        await result.handleSubmit(ref);

                        expect(mockDispatch).not.toHaveBeenCalledWith(type);
                    }, {
                        preloadedState: {
                            ...stateWithCategoryWithHighContrast,
                            modal: {
                                ...stateWithCategoryWithHighContrast.modal,
                                create: false
                            }
                        }
                    });
                    _unmount = unmount;
                });
            });
        });

    });
});