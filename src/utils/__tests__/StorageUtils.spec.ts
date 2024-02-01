import Category from "../../types/Category";
import { deleteById, getAll, getById, save, update, write } from "../StorageUtils";

describe("Storage Test Suite", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(Storage.prototype, "getItem");
    Storage.prototype.getItem = jest.fn();

    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(initialCategories));
  });

  const initialCategories: Category[] = [
    {
      code: "abc",
      colour: "#000000",
      id: "1",
      title: "Category 1"
    },
    {
      code: "def",
      colour: "#999999",
      id: "2",
      title: "Category 2"
    }
  ];

  test("should write to localStorage", () => {
    write("categories", initialCategories);

    expect(localStorage.setItem).toHaveBeenCalledWith("categories", JSON.stringify(initialCategories));
  });

  test("should not save to localStorage if already present", () => {
    save("categories", initialCategories[0]);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test("should save to localStorage if not present", () => {
    const newCategory = {
      code: "ghi",
      colour: "#ffffff",
      id: "3",
      title: "Category 3"
    };
    jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("3");
    save("categories", newCategory);

    expect(localStorage.setItem).toHaveBeenCalledWith("categories", JSON.stringify([
      ...initialCategories,
      newCategory
    ]));
  });

  test("should get all from localStorage", () => {
    expect(JSON.parse(localStorage.getItem("categories") || "")).toEqual(initialCategories);
  });

  test("should return empty array if no items in localStorage", () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    expect(getAll("categories")).toEqual([]);
  });

  test("should get by id from localStorage", () => {
    expect(getById("categories", "1")).toEqual(initialCategories[0]);
  });

  test("should update category in localStorage", () => {
    const updatedCategory = {
      ...initialCategories[0],
      title: "Updated Category 1"
    };
    update("categories", "1", updatedCategory);

    expect(localStorage.setItem).toHaveBeenCalledWith("categories", JSON.stringify([updatedCategory, initialCategories[1]]));
  });

  test("should delete category in localStorage", () => {
    deleteById("categories", "1");

    expect(localStorage.setItem).toHaveBeenCalledWith("categories", JSON.stringify([initialCategories[1]]));
  });

  test("should not delete category in localStorage if not present", () => {
    deleteById("categories", "3");

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

});
