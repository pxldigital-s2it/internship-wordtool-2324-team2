import { addMockAdapterSupport, callAndCheckDispatchCalls } from "../../../__tests__/utils/TestUtils";
import { deleteSubCategory } from "../CategoryMiddleware";

const axiosMock = addMockAdapterSupport();
describe("deleteSubCategory", () => {
    jest.spyOn(require("../CategoryMiddleware"), "loadData").mockReturnValue({ type: "loadData" })
    let consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(deleteSubCategory("1"), dispatchCalls);

    test("happy path", async () => {
        axiosMock.onDelete("http://localhost:3001/subCategories/1").reply(200);
        await _callAndCheckDispatchCalls(["loadData"]);
    });

    test("network error", async () => {
        axiosMock.onDelete("http://localhost:3001/subCategories/1").networkError();
        await _callAndCheckDispatchCalls([]);
        expect(consoleSpy).toHaveBeenCalledWith("Network Error")
    });
})