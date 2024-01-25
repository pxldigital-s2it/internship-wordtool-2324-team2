import { addMockAdapterSupport, callAndCheckDispatchCalls } from "../../../__tests__/utils/TestUtils";
import { loadData } from "../CategoryMiddleware";
import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../../redux/category/category.slice";

describe("CategoryMiddleware Test Suite", () => {
    const axiosMock = addMockAdapterSupport();
    describe("loadData", () => {
        const COMMON_CALLS = [loadDataStart.type];
        const CALLS_SUCCESS = [...COMMON_CALLS, loadDataSuccess.type];
        const CALLS_FAILURE = [...COMMON_CALLS, loadDataFailure.type];

        const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(loadData(), dispatchCalls);

        test("happy path", async () => {
            axiosMock.onGet("http://localhost:3001/categories").reply(200, [{ id: "1", title: "test" }]);
            axiosMock.onGet("http://localhost:3001/subCategories").reply(200, [{
                categoryId: "1",
                description: "test",
                id: "1"
            }]);
            await _callAndCheckDispatchCalls(CALLS_SUCCESS);
        });

        test("network error", async () => {
            axiosMock.onGet("http://localhost:3001/categories").networkError();

            await _callAndCheckDispatchCalls(CALLS_FAILURE);
        });
    })
});
