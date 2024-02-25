import Category from "../../types/Category";
import { deleteById, getAll, getById, loadInitialStorage, save, update, write } from "../StorageUtils";
import { StorageKeys } from "../StorageUtils.types";

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
    write(StorageKeys.CATEGORY, initialCategories);

    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.CATEGORY, JSON.stringify(initialCategories));
  });

  test("should not save to localStorage if already present", () => {
    save(StorageKeys.CATEGORY, initialCategories[0]);

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
    save(StorageKeys.CATEGORY, newCategory);

    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.CATEGORY, JSON.stringify([
      ...initialCategories,
      newCategory
    ]));
  });

  test("should get all from localStorage", () => {
    expect(JSON.parse(localStorage.getItem(StorageKeys.CATEGORY) || "")).toEqual(initialCategories);
  });

  test("should return empty array if no items in localStorage", () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    expect(getAll(StorageKeys.CATEGORY)).toEqual([]);
  });

  test("should get by id from localStorage", () => {
    expect(getById(StorageKeys.CATEGORY, "1")).toEqual(initialCategories[0]);
  });

  test("should update category in localStorage", () => {
    const updatedCategory = {
      ...initialCategories[0],
      title: "Updated Category 1"
    };
    update(StorageKeys.CATEGORY, "1", updatedCategory);

    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.CATEGORY, JSON.stringify([updatedCategory, initialCategories[1]]));
  });

  test("should delete category in localStorage", () => {
    deleteById(StorageKeys.CATEGORY, "1");

    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.CATEGORY, JSON.stringify([initialCategories[1]]));
  });

  test("should not delete category in localStorage if not present", () => {
    deleteById(StorageKeys.CATEGORY, "3");

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test("should load initial storage", () => {
    const data = {
      categories: [
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          title: "Category 3"
        }
      ],
      subCategories: [],
      subSubCategories: []
    };
    jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("3");
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    loadInitialStorage(data);

    expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.CATEGORY, JSON.stringify(data.categories));
  });

  test("should not load initial storage if already present", () => {
    const data = {
      categories: [
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          title: "Category 3"
        }
      ],
      subCategories: [],
      subSubCategories: []
    };
    jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("3");

    loadInitialStorage(data);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  describe("handle shortCodes", () => {

    test("should re-arrange shortCodes in localStorage if subSubCategory", () => {
      const subSubCategories = [
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubSubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubSubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubSubCategory 3"
        }
      ];
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(subSubCategories));

      deleteById(StorageKeys.SUBSUBCATEGORY, "1");

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBSUBCATEGORY, JSON.stringify([
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "1",
          title: "SubSubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "2",
          title: "SubSubCategory 3"
        }
      ]));

    });

    test("should re-arrange shortCodes in localStorage if subCategory", () => {
      const subCategories = [
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubCategory 3"
        },
        {
          code: "jkl",
          colour: "#000000",
          id: "4",
          shortCode: "4",
          title: "SubCategory 4"
        }
      ];
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(subCategories));

      deleteById(StorageKeys.SUBCATEGORY, "2");

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBCATEGORY, JSON.stringify([
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubCategory 1"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "2",
          title: "SubCategory 3"
        },
        {
          code: "jkl",
          colour: "#000000",
          id: "4",
          shortCode: "3",
          title: "SubCategory 4"
        }
      ]));
    });

    test('should handle shortCodes correctly when saving item that is first item in subCategories', () => {
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify([]));

      const newSubCategory = {
        code: "mno",
        colour: "#000000",
        title: "SubCategory 5"
      };
      jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("5");
      save(StorageKeys.SUBCATEGORY, newSubCategory);

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBCATEGORY, JSON.stringify([
        {
          code: "mno",
          colour: "#000000",
          title: "SubCategory 5",
          // eslint-disable-next-line sort-keys
          id: "5",
          shortCode: "1"
        }
      ]));
    })

    test('should handle shortCodes correctly when saving item that is first item in subSubCategories', () => {
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify([]));

      const newSubSubCategory = {
        code: "mno",
        colour: "#000000",
        title: "SubSubCategory 5"
      };
      jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("5");
      save(StorageKeys.SUBSUBCATEGORY, newSubSubCategory);

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBSUBCATEGORY, JSON.stringify([
        {
          code: "mno",
          colour: "#000000",
          title: "SubSubCategory 5",
          // eslint-disable-next-line sort-keys
          id: "5",
          shortCode: "1"
        }
      ]));
    });

    test('should handle shortCodes correctly when saving item that is not first item in subCategories', () => {
      const subCategories = [
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubCategory 3"
        },
        {
          code: "jkl",
          colour: "#000000",
          id: "4",
          shortCode: "4",
          title: "SubCategory 4"
        }
      ];
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(subCategories));

      const newSubCategory = {
        code: "mno",
        colour: "#000000",
        title: "SubCategory 5"
      };
      jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("5");
      save(StorageKeys.SUBCATEGORY, newSubCategory);

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBCATEGORY, JSON.stringify([
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubCategory 3"
        },
        {
          code: "jkl",
          colour: "#000000",
          id: "4",
          shortCode: "4",
          title: "SubCategory 4"
        },
        {
          code: "mno",
          colour: "#000000",
          title: "SubCategory 5",
          // eslint-disable-next-line sort-keys
          id: "5",
          shortCode: "5"
        }
      ]));
    });

    test('should handle shortCodes correctly when saving item that is not first item in subSubCategories', () => {
      const subSubCategories = [
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubSubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubSubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubSubCategory 3"
        }
      ];
      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(subSubCategories));

      const newSubSubCategory = {
        code: "mno",
        colour: "#000000",
        title: "SubSubCategory 4"
      };
      jest.spyOn(require("../UuidUtils"), "getRandomUuid").mockReturnValue("4");
      save(StorageKeys.SUBSUBCATEGORY, newSubSubCategory);

      expect(localStorage.setItem).toHaveBeenCalledWith(StorageKeys.SUBSUBCATEGORY, JSON.stringify([
        {
          code: "abc",
          colour: "#000000",
          id: "1",
          shortCode: "1",
          title: "SubSubCategory 1"
        },
        {
          code: "def",
          colour: "#999999",
          id: "2",
          shortCode: "2",
          title: "SubSubCategory 2"
        },
        {
          code: "ghi",
          colour: "#ffffff",
          id: "3",
          shortCode: "3",
          title: "SubSubCategory 3"
        },
        {
          code: "mno",
          colour: "#000000",
          title: "SubSubCategory 4",
          // eslint-disable-next-line sort-keys
          id: "4",
          shortCode: "4"
        }
      ]));
    });

  });

});
