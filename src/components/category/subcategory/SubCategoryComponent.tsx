import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { insertAndHighlightText } from "./SubCategoryComponent.utils";
import SubCategory from "../../../types/SubCategory";
import {
  deleteSubCategory,
  deleteSubSubCategory,
  getCategoryDataById,
  updateSubCategoryIsFavorite
} from "../../../middleware/category/CategoryMiddleware";
import { saveSubSubCategory, updateSubCategory, updateSubSubCategory } from "../../../middleware/modal/ModalMiddleware";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { Icon } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Button } from "@fluentui/react-components";


const SubCategoryComponent: React.FC<SubCategory> = ({
                                                       id,
                                                       categoryId,
                                                       description,
                                                       isFavorite,
                                                       backgroundColor,
                                                       shortCode,
                                                       subSubCategories,
                                                       url
                                                     }) => {
  const dispatch = useAppDispatch();

  /*
  * SubCategory
  * */
  // For the icons
  const [isHovered, setIsHovered] = useState(false);

  // For the favorites' category details
  const [categoryDetails, setCategoryDetails] = useState({ code: "", colour: "" });

  // For fast edit
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
  const textareaRef = useRef(null);


  // runs when the isEditing state changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  // Handle when fast edit textarea loses focus
  const handleBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setTempDescription(description);
    }
  };

  useEffect(() => {
    if (isFavorite) {
      dispatch(getCategoryDataById(categoryId)).then(data => {
        if (data) {
          setCategoryDetails({ code: data.code, colour: data.colour });
        }
      });
    }
  }, [dispatch, categoryId, isFavorite]);

  const toggleFavorite = useCallback(() => {
    dispatch(updateSubCategoryIsFavorite(id, !isFavorite));
  }, [dispatch, id, isFavorite]);

  const handleDelete = useCallback(() => {
    dispatch(deleteSubCategory(id));
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [dispatch, categoryId, description, id, isFavorite, isEditing]);


  /*
  * SubSubCategory
  * */
  const [isSubSubHovered, setIsSubSubHovered] = useState(false);

  // state variable to track the ID of the sub-sub-category being edited
  const [editingSubSubCategoryId, setIsEditingSubSubCategoryId] = useState<string | null>(null);
  const [editingSubSubCategoryDescription, setIsEditingSubSubCategoryDescription] = useState("");


  const [isAddingSubSubCategory, setIsAddingSubSubCategory] = useState(false);
  const [newSubSubCategoryDescription, setNewSubSubCategoryDescription] = useState("");
  const [newSubSubCategoryURL, setNewSubSubCategoryURL] = useState("");

  const [isSubEditing, setIsEditingSubSubCategory] = useState(false);
  const subSubCategoryTextareaRef = useRef(null);
  const newSubSubCategoryTextareaRef = useRef(null);

  const handleAddSubSubCategoryClick = useCallback(() => {
    setIsAddingSubSubCategory(true);
    setNewSubSubCategoryDescription("");
    setNewSubSubCategoryURL("");
  }, []);
  // runs when the isEditing state changes
  useEffect(() => {
    if (subSubCategoryTextareaRef.current) {
      subSubCategoryTextareaRef.current.focus();
      const length = subSubCategoryTextareaRef.current.value.length;
      subSubCategoryTextareaRef.current.setSelectionRange(length, length);
    }

    if (newSubSubCategoryTextareaRef.current) {
      newSubSubCategoryTextareaRef.current.focus();
      const length = newSubSubCategoryTextareaRef.current.value.length;
      newSubSubCategoryTextareaRef.current.setSelectionRange(length, length);
    }
  }, [isSubEditing]);

  const handleSubSubDelete = useCallback((subSubCategoryId) => {
    // Dispatch the delete action with the specific subSubCategoryId
    dispatch(deleteSubSubCategory(subSubCategoryId));
  }, [dispatch]);

  const handleSubSubEdit = (subSubCategoryId: string, currentDescription: string) => {
    setIsEditingSubSubCategory(!isSubEditing);
    setIsEditingSubSubCategoryId(subSubCategoryId);
    setIsEditingSubSubCategoryDescription(currentDescription);
  };

  const handleSubSaveEdit = (subSubCategoryId: string) => {
    // Dispatch the update action with the subSubCategoryId and the new description.
    if (editingSubSubCategoryDescription.trim() !== "") {
      dispatch(updateSubSubCategory(subSubCategoryId, { description: editingSubSubCategoryDescription.trim() }));
    }

    // Reset the editing state after saving.
    setIsEditingSubSubCategoryId(null);
    setIsEditingSubSubCategoryDescription("");
  };

  const handleTextInsertion = useCallback(async () => {
    await insertAndHighlightText(categoryId, description, shortCode, url);
  }, [categoryId, description]);

  const handleSaveNewSubSubCategory = useCallback(() => {
    const newSubSubCategory = {
      description: newSubSubCategoryDescription.trim().length > 0 && newSubSubCategoryDescription || "Nieuwe ondertitel",
      id: Math.random().toString(36).substring(7),
      subCategoryId: id,
      url: newSubSubCategoryURL
    };

    dispatch(saveSubSubCategory(newSubSubCategory));

    // Reset the state to hide the textareas
    setIsAddingSubSubCategory(false);
    setNewSubSubCategoryDescription("");
    setNewSubSubCategoryURL("");
  }, [dispatch, newSubSubCategoryDescription, newSubSubCategoryURL, id]);


  return (
    <>
      <div style={{
        width: "100%"
      }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
           className={sectionClassNames.section}>
        <td style={{ paddingRight: "6px" }}>
          <div style={{ width: "16px" }}>
            <div style={{
              backgroundColor: categoryDetails.colour || backgroundColor,
              height: isHovered ? "38px" : "32px",
              marginTop: "-1px",
              width: isHovered ? "16px" : "1px"
            }} className={sectionClassNames.activeRowColorBlock}
            title={shortCode + ". " + description}>&nbsp;</div>
          </div>
        </td>
        <td onClick={toggleFavorite} title={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}>
          <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
                className={`${sectionClassNames.menuIcon} ${isFavorite && "isFavorite"} ${isHovered && "showIcon"}`} />
        </td>
        <td onClick={handleEdit}>
          <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                title="Wijzigen" />
        </td>
        <td>
          <Icon iconName="CircleAddition" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                onClick={handleAddSubSubCategoryClick} title="Toevoegen" />
        </td>
        <td onClick={!isEditing ? handleTextInsertion : undefined}
            style={{ width: "100%" }} className={sectionClassNames.sectionText}>
          <div className={sectionClassNames.descriptionTextContainerDiv}>
            <div className={sectionClassNames.descriptionTextDiv} title={description}>
              {!isEditing ? (
                shortCode + ". " + description
              ) : (
                <textarea
                  // This ref is for moving the caret to the last char when taking focus for quick edit
                  ref={textareaRef}
                  style={{ fontFamily: "Segoe UI", width: "90%" }}
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      // submit logic
                      setIsEditing(false);
                      dispatch(updateSubCategory(id, { description: tempDescription }));
                    } else if (e.key === "Escape") {
                      e.preventDefault();

                      // cancel logic
                      setIsEditing(false);
                      setTempDescription(description);
                    }

                    // shift enter for a new line is handled by default
                  }}
                  onBlur={handleBlur}
                  autoFocus
                />
              )}
            </div>
          </div>
        </td>
        <td onClick={handleDelete}>
          <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                title="Verwijderen" />
        </td>
        <td></td>
      </div>


      {/*
        SubSubCategory
      */}
      {subSubCategories &&
        <table className={sectionClassNames.subSubCategoryTable}>
          <tbody>
          {isAddingSubSubCategory && (
            <tr onMouseEnter={() => setIsSubSubHovered(true)} onMouseLeave={() => setIsSubSubHovered(false)}
                className={sectionClassNames.subSubCategoryRow} style={{ backgroundColor: backgroundColor + "1A" }}>

              <td>
                <Icon iconName="Add" className={`${sectionClassNames.menuIcon} showIcon`}
                      title="Nieuwe ondertitel" />
              </td>
              <td></td>
              <td colSpan={4}>
                <div><Icon iconName={"Comment"}></Icon> <b>Beschrijving</b></div>
                <textarea
                  ref={newSubSubCategoryTextareaRef}
                  placeholder="Beschrijving"
                  value={newSubSubCategoryDescription}
                  onChange={(e) => setNewSubSubCategoryDescription(e.target.value)}
                  style={{ fontFamily: "Segoe UI", width: "90%" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      handleSaveNewSubSubCategory();
                    } else if (e.key === "Escape") {
                      e.preventDefault();

                      setIsAddingSubSubCategory(false);
                      setNewSubSubCategoryDescription("");
                      setNewSubSubCategoryURL("");
                    }
                  }}
                  autoFocus
                />

                <div><Icon iconName={"Link"}></Icon> <b>Hyperlink</b></div>
                <textarea
                  placeholder="https://voorbeeld.com/"
                  value={newSubSubCategoryURL}
                  onChange={(e) => setNewSubSubCategoryURL(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      handleSaveNewSubSubCategory();
                    } else if (e.key === "Escape") {
                      e.preventDefault();

                      setIsAddingSubSubCategory(false);
                      setNewSubSubCategoryDescription("");
                      setNewSubSubCategoryURL("");
                    }
                  }}
                  style={{ fontFamily: "Segoe UI", width: "90%" }}
                />
                <PrimaryButton onClick={handleSaveNewSubSubCategory}>Opslaan</PrimaryButton>
                &nbsp;
                <Button onClick={() => setIsAddingSubSubCategory(false)}>Annuleren</Button>
              </td>
            </tr>
          )}

          {subSubCategories.map((subSubCategory, index) => (
            <tr onMouseEnter={() => setIsSubSubHovered(true)} onMouseLeave={() => setIsSubSubHovered(false)}
                className={sectionClassNames.subSubCategoryRow} style={{ backgroundColor: backgroundColor + "1A" }}
                key={subSubCategory.id}
                onClick={() => insertAndHighlightText(categoryId, description + " - " + subSubCategory.description, shortCode + "." + (index + 1), url)}>


              {/*
                Edit icon for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryEditIcon}`}
                  onClick={() => handleSubSubEdit(subSubCategory.id, subSubCategory.description)}>
                <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isSubSubHovered && "showIcon"}`}
                      title="Wijzigen" />
              </td>

              {/*
                shortCode for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryShortCode}`}>{shortCode + "." + (index + 1)}</td>
              {/*
                Editable description for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryDescription}`}>

                {editingSubSubCategoryId === subSubCategory.id ? (
                  <>
                    <div><Icon iconName={"Comment"}></Icon> <b>Beschrijving</b></div>
                    <textarea
                      placeholder="Beschrijving"
                      ref={subSubCategoryTextareaRef}
                      style={{ fontFamily: "Segoe UI", width: "90%" }}
                      value={editingSubSubCategoryDescription}
                      onChange={(e) => setIsEditingSubSubCategoryDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();

                          handleSubSaveEdit(subSubCategory.id);
                        } else if (e.key === "Escape") {
                          e.preventDefault();

                          setIsEditingSubSubCategoryId(null);
                          setIsEditingSubSubCategoryDescription("");
                        }

                      }}
                      autoFocus
                    />

                    {/*URL icon*/}
                    <div><Icon iconName={"Link"}></Icon> <b>Hyperlink</b></div>
                    {/*
                      Hyperlink box
                    */}
                    <textarea
                      placeholder="https://voorbeeld.com/"
                      style={{ fontFamily: "Segoe UI", width: "90%" }}
                      value={subSubCategory.url}
                      onChange={(e) => dispatch(updateSubSubCategory(subSubCategory.id, { url: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();

                          handleSubSaveEdit(subSubCategory.id);
                        } else if (e.key === "Escape") {
                          e.preventDefault();

                          setIsEditingSubSubCategoryId(null);
                          setIsEditingSubSubCategoryDescription("");
                        }

                      }}
                    />

                    {/*
                    Save button
                  */}
                    <PrimaryButton onClick={() => handleSubSaveEdit(subSubCategory.id)}>Opslaan</PrimaryButton>
                    &nbsp;<Button onClick={() => {
                    setIsEditingSubSubCategoryId(null);
                    setIsEditingSubSubCategoryDescription("");
                  }}>Annuleren</Button>
                  </>
                ) : (
                  <div
                    onClick={() => isSubEditing ? handleSubSubEdit(subSubCategory.id, subSubCategory.description) : undefined}>

                    <div className={sectionClassNames.sectionText}>
                      <div className={sectionClassNames.descriptionTextContainerDiv}>
                        <div className={sectionClassNames.descriptionTextDiv} title={subSubCategory.description}>
                          {subSubCategory.url && (subSubCategory.url.trim() == "" ? "" :
                            <div className={sectionClassNames.urlIcon} title={`${subSubCategory.url}`}><Icon
                              iconName={"Link"}></Icon></div>)}
                          {subSubCategory.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </td>

              {/*
                Delete icon for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryDeleteIcon} `}
                  onClick={() => handleSubSubDelete(subSubCategory.id)}>
                <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isSubSubHovered && "showIcon"}`}
                      title="Verwijderen" />
              </td>
            </tr>))}
          </tbody>
        </table>
      }
    </>
  );
};

export default SubCategoryComponent;
