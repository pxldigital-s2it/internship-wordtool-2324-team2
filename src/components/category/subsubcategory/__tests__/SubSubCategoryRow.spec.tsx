import React from "react";
import SubSubCategoryRow from "../SubSubCategoryRow";
import { renderWithProviders } from "../../../../__tests__/utils/TestUtils";
import { initialState } from "../../../../redux/store";
import { fireEvent, waitFor } from "@testing-library/react";
import { sectionClassNames } from "../../subcategory/SubCategoryComponent.styles";

describe("SubSubCategoryRow Test Suite", () => {
  const DEFAULT_PROPS = {
    backgroundColor: "backgroundColor",
    categoryId: "categoryId",
    description: "description",
    shortCode: "shortCode",
    subSubCategory: {
      description: "description",
      id: "1",
      shortCode: "1",
      subCategoryId: "subcat-1",
      url: "url"
    }
  };

  const createComponent = (props = DEFAULT_PROPS) => (
    <SubSubCategoryRow {...props} />
  );

  afterEach(jest.resetAllMocks);

  test("Initial Render", () => {
    const { container, queryByPlaceholderText, queryByRole, queryByText } = renderWithProviders(createComponent(), { preloadedState: initialState });

    expect(queryByPlaceholderText("https://www.voorbeeld.com")).toBeNull();

    const editButton = queryByRole("img", { name: "Wijzigen" });
    expect(editButton).not.toBeNull();
    expect(editButton.className).not.toContain("showIcon");
    expect(queryByRole("img", { name: "Wijzigen" }));
    expect(queryByText("shortCode.1")).not.toBeNull();
    expect(container.querySelector(".urlIcon-126")).not.toBeNull();
    expect(queryByText("description")).not.toBeNull();
  });

  test("Edit Button Click", () => {
    const { container, queryByRole, queryByPlaceholderText } = renderWithProviders(createComponent(), { preloadedState: initialState });

    const editButton = queryByRole("img", { name: "Wijzigen" });
    expect(editButton).not.toBeNull();
    expect(editButton.className).not.toContain("showIcon");

    fireEvent.mouseEnter(container.querySelector(`.${sectionClassNames.subSubCategoryRow}`));
    expect(editButton.className).toContain("showIcon");

    fireEvent.click(editButton);
    expect(queryByPlaceholderText("https://www.voorbeeld.com")).not.toBeNull();

    fireEvent.mouseLeave(container.querySelector(`.${sectionClassNames.subSubCategoryRow}`));
    expect(editButton.className).not.toContain("showIcon");
  });

  test("Delete Button Click", () => {
    const type = "DELETE_SUB_SUB_CATEGORY";

    const dispatchMock= jest.fn();
    jest.spyOn(require("../../../../redux/hooks"), "useAppDispatch").mockImplementation(() => dispatchMock);
    const deleteSubSubCategorySpy = jest.spyOn(require("../../../../middleware/category/CategoryMiddleware"), "deleteSubSubCategory").mockImplementation(() => ({ type }));
    const { queryByRole } = renderWithProviders(createComponent(), { preloadedState: initialState });

    const deleteButton = queryByRole("img", { name: "Verwijderen" });
    expect(deleteButton).not.toBeNull();
    fireEvent.click(deleteButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock.mock.calls[0][0].type).toBe(type);
    expect(deleteSubSubCategorySpy).toHaveBeenCalledWith(DEFAULT_PROPS.subSubCategory.id);
  });

  test("Text Insertion - with url", async() => {
    const getSubCategoryTextSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "getSubCategoryText").mockResolvedValue("subCategoryText");
    const getCategoryStyleNameSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "getCategoryStyleName").mockResolvedValue("categoryStyleName");
    const insertTextWithUrlSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "insertTextWithUrl").mockReturnValue("insertTextWithUrl");
    const insertTextSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "insertText").mockReturnValue("insertText");

    const {  container } = renderWithProviders(createComponent(), { preloadedState: initialState });


    fireEvent.click(container.querySelector(`.${sectionClassNames.sectionText}`));

    await waitFor(() => {
      expect(getSubCategoryTextSpy).toHaveBeenCalledWith(DEFAULT_PROPS.categoryId, "description - description", "shortCode.1", false);
    })
    await waitFor(() => {
      expect(getCategoryStyleNameSpy).toHaveBeenCalledWith(DEFAULT_PROPS.categoryId, DEFAULT_PROPS.backgroundColor);
    })
    await waitFor(() => {
      expect(insertTextWithUrlSpy).toHaveBeenCalledWith("subCategoryText", "categoryStyleName", "url");
    })
    expect(insertTextSpy).not.toHaveBeenCalled();
  });

  test("Text Insertion - without url", async() => {
    const getSubCategoryTextSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "getSubCategoryText").mockResolvedValue("subCategoryText");
    const getCategoryStyleNameSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "getCategoryStyleName").mockResolvedValue("categoryStyleName");
    const insertTextWithUrlSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "insertTextWithUrl").mockReturnValue("insertTextWithUrl");
    const insertTextSpy = jest.spyOn(require("../../../../utils/TextInsertUtils"), "insertText").mockReturnValue("insertText");

    const {  container } = renderWithProviders(createComponent({ ...DEFAULT_PROPS, subSubCategory: { ...DEFAULT_PROPS.subSubCategory, url: "" } }), { preloadedState: initialState });

    fireEvent.click(container.querySelector(`.${sectionClassNames.sectionText}`));

    await waitFor(() => {
      expect(getSubCategoryTextSpy).toHaveBeenCalledWith(DEFAULT_PROPS.categoryId, "description - description", "shortCode.1", false);
    })
    await waitFor(() => {
      expect(getCategoryStyleNameSpy).toHaveBeenCalledWith(DEFAULT_PROPS.categoryId, DEFAULT_PROPS.backgroundColor);
    })
    await waitFor(() => {
      expect(insertTextSpy).toHaveBeenCalledWith("subCategoryText", "categoryStyleName");
    })
    expect(insertTextWithUrlSpy).not.toHaveBeenCalled();
  });

});
