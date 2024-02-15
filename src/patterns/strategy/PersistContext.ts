import PersistStrategy from "./PersistStrategy";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";
import { FetchPersistStrategy, StoragePersistStrategy } from "../../utils/StorageUtils";

class PersistContext {

  private persistStrategy: PersistStrategy;

  constructor(persistStrategy: PersistStrategy) {
    this.persistStrategy = persistStrategy;
  }

  setStrategy(persistStrategy: PersistStrategy) {
    this.persistStrategy = persistStrategy;
  }

  save(key: string, value: any) {
    this.persistStrategy.save(key, value);
  }

  getAll(key: string) {
    return this.persistStrategy.getAll(key);
  }

  getById(key: string, id: string) {
    return this.persistStrategy.getById(key, id);
  }

  update(key: string, id: string, value: any) {
    this.persistStrategy.update(key, id, value);
  }

  deleteById(key: string, id: string) {
    this.persistStrategy.deleteById(key, id);
  }

  loadInitialStorage(data: { categories: Category[], subCategories: SubCategory[] }) {
    this.persistStrategy.loadInitialStorage(data);
  }

}


const persistContext = new PersistContext(new FetchPersistStrategy());
persistContext.setStrategy(new StoragePersistStrategy());
