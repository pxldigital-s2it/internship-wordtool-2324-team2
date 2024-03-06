import Observable from "./Observable";
import Observer from "./Observer";
import ContextMenuData from "./ContextMenuData";
import LabelKey from "../../types/LabelKey";

class CategoryContextMenu implements Observer {
    private _labels: Map<LabelKey, string>;
    private _observable: Observable;

    constructor(observable: Observable) {
        this._observable = observable;
        observable.addObserver(this);
        this._labels = new Map<LabelKey, string>([
            [LabelKey.SUB_CAT, ""],
            [LabelKey.EDIT, ""],
            [LabelKey.DELETE, ""]
        ]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(observable: Observable, _?: Object): void {
        if (observable instanceof ContextMenuData) {
            this._labels.forEach((_, key) => this._labels.set(key, observable.getLabel(key)));
        }
    }

    unSubscribe() {
        this._observable.deleteObserver(this);
    }

    getSubCategoryLabel(): string {
        return this._labels.get(LabelKey.SUB_CAT);
    }

    getEditLabel(): string {
        return this._labels.get(LabelKey.EDIT);
    }

    getDeleteLabel(): string {
        return this._labels.get(LabelKey.DELETE);
    }

}

export default CategoryContextMenu;