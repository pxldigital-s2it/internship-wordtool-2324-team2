import {
    addStorageMockSupport,
    callAndCheckDispatchCalls
} from "../../../__tests__/utils/TestUtils";
import { loadData } from "../CategoryMiddleware";
import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../../redux/category/category.slice";

describe("CategoryMiddleware Test Suite", () => {
    const storageMock = addStorageMockSupport();
    describe("loadData", () => {
        const COMMON_CALLS = [loadDataStart.type];
        const CALLS_SUCCESS = [...COMMON_CALLS, loadDataSuccess.type];
        const CALLS_FAILURE = [...COMMON_CALLS, loadDataFailure.type];

        const _callAndCheckDispatchCalls = async (dispatchCalls) => callAndCheckDispatchCalls(loadData(), dispatchCalls);

        test("happy path", async () => {
            storageMock("getAll", () => []);

            await _callAndCheckDispatchCalls(CALLS_SUCCESS);
        });

        test("network error", async () => {
            storageMock("getAll", () => {
                throw new Error("Network Error")
            });

            await _callAndCheckDispatchCalls(CALLS_FAILURE);
        });
    })
});