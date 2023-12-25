import Observable from "./Observable";
import Observer from "./Observer";
import LabelKey from "../../types/LabelKey";

class ContextMenuData implements Observable {

  private _observers: Observer[];
  private _changed: boolean = false;
  private _labels: Map<LabelKey, string>;

  constructor() {
    this._observers = [];
    this._labels = new Map<LabelKey, string>();
  }

  addObserver(observer: Observer): void {
    this._observers.push(observer);
  }

  deleteObserver(observer: Observer): void {
    const i = this._observers.indexOf(observer);
    if (i >= 0) {
      this._observers.splice(i, 1);
    }
  }

  notifyObservers(): void {
    for (let i = 0; i < this._observers.length; i++) {
      const observer = this._observers.at(i);
      observer.update(this);
    }
  }

  labelsChanged(): void {
    this.setChanged();
    this.notifyObservers();
    this.setChanged();
  }

  setChanged(): void {
    this._changed = !this._changed;
  }

  setLabels(labels: Map<LabelKey, string>): void {
    this._labels = labels;
  }

  setLabel(key: LabelKey, label: string): void {
    this._labels.set(key, label);
  }

  getLabels(): Map<LabelKey, string> {
    return this._labels;
  }

  getLabel(key: LabelKey): string {
    return this._labels.get(key);
  }

}

export default ContextMenuData;