import Category from '../../types/Category';

export interface CategoryDataState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}
