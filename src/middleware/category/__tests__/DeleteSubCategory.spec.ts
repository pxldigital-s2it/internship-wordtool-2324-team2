import { addStorageMockSupport, callAndCheckDispatchCalls } from "../../../__tests__/utils/TestUtils";
import { deleteSubCategory } from "../CategoryMiddleware";

describe("deleteSubCategory", () => {
    const storageMock = addStorageMockSupport();

    jest.spyOn(require("../CategoryMiddleware"), "loadData").mockReturnValue({ type: "loadData" })
    let consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(deleteSubCategory("1"), dispatchCalls);

    test("happy path", async () => {
        storageMock("deleteById", () => {});
        await _callAndCheckDispatchCalls(["loadData"]);
    });

    test("network error", async () => {
        storageMock("deleteById", () => {throw new Error("Network Error")});
        await _callAndCheckDispatchCalls([]);
        expect(consoleSpy).toHaveBeenCalledWith("Network Error")
    });
})
