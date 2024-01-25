import { addMockAdapterSupport, callAndCheckDispatchCalls } from "../../../__tests__/utils/TestUtils";
import { deleteCategory } from "../CategoryMiddleware";

const axiosMock = addMockAdapterSupport();
describe("deleteCategory", () => {
    jest.spyOn(require("../CategoryMiddleware"), "loadData").mockReturnValue({ type: "loadData" })
    let consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(deleteCategory("1"), dispatchCalls);

    test("happy path", async () => {
        axiosMock.onDelete("http://localhost:3001/Categories/1").reply(200);
        await _callAndCheckDispatchCalls(["loadData"]);
    });

    test("network error", async () => {
        axiosMock.onDelete("http://localhost:3001/Categories/1").networkError();
        await _callAndCheckDispatchCalls([]);
        expect(consoleSpy).toHaveBeenCalledWith("Network Error")
    });
})