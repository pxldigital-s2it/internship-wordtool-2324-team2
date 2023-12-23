import Observer from "./Observer";

interface Observable {

  addObserver(observer: Observer): void;
  deleteObserver(observer: Observer): void;
  notifyObservers(): void;
  setChanged(): void;

}

export default Observable;