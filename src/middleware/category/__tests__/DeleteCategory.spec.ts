import {
    addStorageMockSupport,
    callAndCheckDispatchCalls
} from "../../../__tests__/utils/TestUtils";
import { deleteCategory } from "../CategoryMiddleware";

describe("deleteCategory", () => {
    jest.spyOn(require("../CategoryMiddleware"), "loadData").mockReturnValue({ type: "loadData" })
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const storageSpy = addStorageMockSupport();
    const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(deleteCategory("1"), dispatchCalls);

    test("happy path", async () => {
        storageSpy("deleteById", () => {});
        await _callAndCheckDispatchCalls(["loadData"]);
    });

    test("network error", async () => {
        storageSpy("deleteById", () => {throw new Error("Network Error")});
        await _callAndCheckDispatchCalls([]);
        expect(consoleSpy).toHaveBeenCalledWith("Network Error")
    });
})
