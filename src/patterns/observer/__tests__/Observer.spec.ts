import ContextMenuData from "../ContextMenuData";
import CategoryContextMenu from "../CategoryContextMenu";
import SubCategoryContextMenu from "../SubCategoryContextMenu";
import LabelKey from "../../../types/LabelKey";

describe("Observer Pattern Test Suite", () => {
    let observable: ContextMenuData, categoryObserver: CategoryContextMenu, subCategoryObserver: SubCategoryContextMenu;
    const ORIGINAL = "ORIGINAL";
    const UPDATED = "UPDATED";
    const originalLabels = new Map<LabelKey, string>([
        [LabelKey.FAVORITE, ORIGINAL],
        [LabelKey.SUB_CAT, ORIGINAL],
        [LabelKey.EDIT, ORIGINAL],
        [LabelKey.DELETE, ORIGINAL]
    ]);
    const updatedLabels = new Map<LabelKey, string>([
        [LabelKey.FAVORITE, UPDATED],
        [LabelKey.SUB_CAT, UPDATED],
        [LabelKey.EDIT, UPDATED],
        [LabelKey.DELETE, UPDATED]
    ]);
    const getCategoryLabels = () => ([categoryObserver.getSubCategoryLabel(), categoryObserver.getEditLabel(), categoryObserver.getDeleteLabel()]);
    const getSubCategoryLabels = () => ([subCategoryObserver.getFavoriteLabel(), subCategoryObserver.getEditLabel(), subCategoryObserver.getDeleteLabel()]);

    const checkCategoryLabels = (expected?: string): void => _checkLabels(getCategoryLabels(), expected);
    const checkSubCategoryLabels = (expected?: string): void => _checkLabels(getSubCategoryLabels(), expected);
    const checkAllLabels = (expected?: string): void => _checkLabels([...getCategoryLabels(), ...getSubCategoryLabels()], expected);
    const _checkLabels = (labels: string[], expected: string = observable.getLabel(LabelKey.FAVORITE)): void => labels.forEach(label => expect(label).toBe(expected));

    beforeEach(() => {
        observable = new ContextMenuData();
        categoryObserver = new CategoryContextMenu(observable);
        subCategoryObserver = new SubCategoryContextMenu(observable);
    });

    test("No labels", () => {
        checkAllLabels("");
    });

    test("With labels", () => {
        observable.setLabels(originalLabels);
        observable.labelsChanged();
        checkAllLabels();
    });

    test("Listens to label updates", () => {
        observable.setLabels(originalLabels);
        observable.labelsChanged();
        checkAllLabels();

        observable.setLabels(updatedLabels);
        observable.labelsChanged();
        checkAllLabels();

        observable.setLabels(originalLabels);
        checkAllLabels(UPDATED);
        observable.labelsChanged();
        checkAllLabels();
    });

    test("Stop listening to label updates", () => {
        observable.setLabels(originalLabels);
        observable.labelsChanged();
        checkAllLabels();

        observable.setLabels(updatedLabels);
        observable.labelsChanged();
        checkAllLabels();

        subCategoryObserver.unSubscribe();
        observable.setLabels(originalLabels);
        observable.labelsChanged();
        checkCategoryLabels(ORIGINAL);
        checkSubCategoryLabels(UPDATED);

        categoryObserver.unSubscribe();
        observable.setLabels(updatedLabels);
        observable.labelsChanged();
        checkCategoryLabels(ORIGINAL);
        checkSubCategoryLabels(UPDATED);
    });

    test("setLabel and getLabels", () => {
        observable.setLabels(originalLabels);
        observable.setLabel(LabelKey.SUB_CAT, UPDATED);

        observable.getLabels().forEach((value, key) => {
            if (key !== LabelKey.SUB_CAT) {
                expect(value).toBe(ORIGINAL);
            } else {
                expect(value).toBe(UPDATED);
            }
        });

    })

});