import Observable from "./Observable";

interface Observer {

  update(observable: Observable, arg?: Object): void;
  unSubscribe(): void;

}

export default Observer;