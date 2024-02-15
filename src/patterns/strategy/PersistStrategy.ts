import SubCategory from "../../types/SubCategory";
import Category from "../../types/Category";

interface PersistStrategy {
  save(key: string, value: any): void;
  getAll(key: string): any;
  getById(key: string, id: string): any;
  update(key: string, id: string, value: any): void;
  deleteById(key: string, id: string): void;
  loadInitialStorage(data: { categories: Category[], subCategories: SubCategory[] }): void;
}

export default PersistStrategy;
