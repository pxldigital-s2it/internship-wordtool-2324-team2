import Category from "../../types/Category";

export interface CategoryState {
    categories?: Category[]
    category?: Category,
    categoryId?: Category["id"]
    colour?: string,
    error?: string,
    isLoading: boolean
}