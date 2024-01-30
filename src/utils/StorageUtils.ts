import SubCategory from "../types/SubCategory";
import Category from "../types/Category";
import { isCategory, isSubCategory } from "../types/IsType";


const equals = (a: Category | SubCategory, b: Category | SubCategory) => {
  if (isCategory(a) && isCategory(b)) {
    return a.id === b.id
      && a.title === b.title
      && a.colour === b.colour
      && a.code === b.code
      && arrayEquals(a.subCategories, b.subCategories);
  }
  else if (isSubCategory(a) && isSubCategory(b)) {
    return a.id === b.id
    && a.categoryId === b.categoryId
      && a.description === b.description;
  }

  return false;
}

const arrayEquals = (a: Category[] | SubCategory[], b: Category[] | SubCategory[]) => {
  if (a?.length !== b?.length) {
    return false;
  }

  for (let i = 0; i < a?.length; ++i) {
    if (!equals(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

export const write = (key: string, value: any) => {
  let value1 = JSON.stringify(value);
  localStorage.setItem(key, value1);
}

export const save = (key: string, value: any) => {
  const parsed = JSON.parse(localStorage.getItem(key));
  if (!parsed.find((item: Category | SubCategory) => equals(item, value))) {
    write(key, [...parsed, value]);
  }
}

export const getAll = (key: string) => {
  const items = localStorage.getItem(key);

  return items !== null ? JSON.parse(items) : [];
}

export const getById = (key: string, id: string) => {
  const items = getAll(key);

  return items.find((item: Category | SubCategory) => item.id === id);
}

export const update = (key: string, id: string, value: any) => {
  const updated = getAll(key).map((item: Category | SubCategory) => {
    if (item.id === id) {
      return {
        ...item,
        ...value
      };
    }

    return item;
  });

  write(key, updated);
}

export const deleteById = (key: string, id: string) => {
  let all = getAll(key);
  const updated = all.filter((item: Category | SubCategory) => item.id !== id);

  if (!arrayEquals(all, updated)) {
    write(key, updated);
  }
}
