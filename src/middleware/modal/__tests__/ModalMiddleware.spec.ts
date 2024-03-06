import { setCategory, setCreate, setOpen, setSubCategory, setTitle } from "../../../redux/modal/modal.slice";
import {
    addStorageMockSupport,
    callAndCheckDispatchCalls
} from "../../../__tests__/utils/TestUtils";
import {
    openCreateCategoryModal,
    openCreateSubCategoryModal,
    openUpdateCategoryModal,
    saveCategory,
    saveSubCategory,
    saveSubSubCategory,
    updateCategory,
    updateSubCategory,
    updateSubSubCategory
} from "../ModalMiddleware";
import Category from "../../../types/Category";
import { setColour } from "../../../redux/category/category.slice";
import SubSubCategory from "../../../types/SubSubCategory";

describe("ModalMiddleware Test Suite", () => {

    const storageMock = addStorageMockSupport();
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {
    });

    beforeEach(() => {
        jest.spyOn(require("../../category/CategoryMiddleware"), "loadData").mockImplementation(() => ({ type: "loadData" }));
    })

    afterEach(jest.resetAllMocks);
    afterAll(jest.restoreAllMocks);

    describe("openCreateCategoryModal", () => {


        const _callAndCheckDispatchCalls = async (dispatchCalls: string[]) => await callAndCheckDispatchCalls(openCreateCategoryModal(), dispatchCalls);

        test("happy path", async () => {
            const dispatchCalls = [
                setTitle.type,
                setCreate.type,
                setCategory.type,
                setOpen.type
            ];

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

    });

    describe("openUpdateCategoryModal", () => {

        const categoryId = "123";

        const category: Category = {
            code: "Some code",
            colour: "#000000",
            id: categoryId,
            title: "testTitle"
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(openUpdateCategoryModal(category), dispatchCalls);

        test("happy path", async () => {
            const dispatchCalls = [
                setTitle.type,
                setCreate.type,
                setCategory.type,
                setColour.type,
                setSubCategory.type,
                setOpen.type
            ];

            await _callAndCheckDispatchCalls(dispatchCalls);
        });
    });

    describe("openCreateSubCategoryModal", () => {

        const categoryId = "123";
        const category = { code: "Some code", colour: "#000000", id: categoryId, title: "testTitle" };

        const _callAndCheckDispatchCalls = async (dispatchCalls: string[]) => await callAndCheckDispatchCalls(openCreateSubCategoryModal(category), dispatchCalls);

        test("happy path", async () => {
            const dispatchCalls = [
                setTitle.type,
                setCreate.type,
                setCategory.type,
                setSubCategory.type,
                setOpen.type
            ];

            await _callAndCheckDispatchCalls(dispatchCalls);
        });
    });


    describe("saveCategory", () => {

        const category: Category = {
            code: "Some code",
            id: "Some categoryId"
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls: (string | undefined)[]) => await callAndCheckDispatchCalls(saveCategory(category), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("save", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("save", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

    describe("updateCategory", () => {

        const category: Category = {
            code: "Some code",
            id: "123"
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(updateCategory("123", category), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("update", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("update", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

    describe("saveSubCategory", () => {

        const subCategory = {
            categoryId: "Some categoryId",
            code: "Some code",
            description: "Some description",
            id: "Some id",
            isFavorite: false
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls: (string | undefined)[]) => await callAndCheckDispatchCalls(saveSubCategory(subCategory), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("save", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("save", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

    describe("updateSubCategory", () => {

        const subCategory = {
            categoryId: "Some categoryId",
            code: "Some code",
            description: "Some description",
            id: "123",
            isFavorite: false
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(updateSubCategory("123", subCategory), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("update", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("update", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

    describe("saveSubSubCategory", () => {

        const subSubCategory: SubSubCategory = {
            description: "Some description",
            id: "Some id",
            subCategoryId: "Some subCategoryId"
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls: (string | undefined)[]) => await callAndCheckDispatchCalls(saveSubSubCategory(subSubCategory), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("save", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("save", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

    describe("updateSubSubCategory", () => {

        const subSubCategory: SubSubCategory = {
            description: "Some description",
            id: "123",
            subCategoryId: "Some subCategoryId"
        };

        const _callAndCheckDispatchCalls = async (dispatchCalls) => await callAndCheckDispatchCalls(updateSubSubCategory("123", subSubCategory), dispatchCalls);


        test("happy path", async () => {
            const dispatchCalls = [
                "loadData",
                undefined,
                setOpen.type,
                setSubCategory.type,
                setTitle.type,
                setCategory.type,
                setColour.type
            ];

            storageMock("update", () => {
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
        });

        test("network error", async () => {
            const dispatchCalls = [];

            storageMock("update", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(dispatchCalls);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Network Error");
        });
    });

});