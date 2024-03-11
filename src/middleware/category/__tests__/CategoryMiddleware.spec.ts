import {
  addStorageMockSupport,
  callAndCheckDispatchCalls
} from "../../../__tests__/utils/TestUtils";
import { _clearLocalStorage, importFromWord, loadData } from "../CategoryMiddleware";
import { loadDataFailure, loadDataStart, loadDataSuccess } from "../../../redux/category/category.slice";

describe("CategoryMiddleware Test Suite", () => {
  const storageMock = addStorageMockSupport();

  afterEach(jest.resetAllMocks)

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
        throw new Error("Network Error");
      });

      await _callAndCheckDispatchCalls(CALLS_FAILURE);
    });
  });

  describe("import export", () => {

    test("importFromWord", async () => {
      const readImportSpy = jest.spyOn(require("../../../utils/TextInsertUtils"), "readImport").mockResolvedValue(true);
      const clearLocalStorageSpy = storageMock("clearLocalStorage", () => {
      });
      storageMock("getAll", () => []);
      const loadInitialStorageSpy = storageMock("loadInitialStorage", () => {
      });

      await callAndCheckDispatchCalls(importFromWord(), [undefined, loadDataStart.type, loadDataSuccess.type]);

      expect(readImportSpy).toHaveBeenCalledTimes(1);
      expect(clearLocalStorageSpy).toHaveBeenCalledTimes(1);
      expect(loadInitialStorageSpy).toHaveBeenCalledTimes(1);
    });

    test("clearLocalStorage", async() => {
      const clearLocalStorageSpy = storageMock("clearLocalStorage", () => {
      });
      storageMock("getAll", () => []);
      await callAndCheckDispatchCalls(_clearLocalStorage(), [undefined, loadDataStart.type, loadDataSuccess.type]);

      expect(clearLocalStorageSpy).toHaveBeenCalledTimes(1);
    })

  });

});
