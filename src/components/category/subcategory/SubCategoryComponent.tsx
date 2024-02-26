import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SubCategory from "../../../types/SubCategory";
import {
  deleteSubCategory,
  getCategoryDataById,
  updateSubCategoryIsFavorite
} from "../../../middleware/category/CategoryMiddleware";
import {
  updateSubCategory, updateSubSubCategory
} from "../../../middleware/modal/ModalMiddleware";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { Icon } from "@fluentui/react";
import * as React from "react";
import { selectAlwaysInsertFullText } from "../../../redux/settings/settings.slice";
import {
  getCategoryStyleName,
  getSubCategoryText,
  insertText,
  insertTextWithUrl
} from "../../../utils/TextInsertUtils";
import SubSubCategory from "../../../types/SubSubCategory";


const SubCategoryComponent: React.FC<SubCategory> = ({ id, categoryId, description, isFavorite, backgroundColor, shortCode, subSubCategories }) => {
  // For the icons
  const [isHovered, setIsHovered] = useState(false);
  const [isSubHovered, setIsSubHovered] = useState(false);

  // For the favorites' category details
  const [categoryDetails, setCategoryDetails] = useState({ code: "", colour: "" });

  // For fast edit
  const [isEditing, setIsEditing] = useState(false);
  const [isSubEditing, setIsSubEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
  const textareaRef = useRef(null);
  const subSubCategoryTextareaRef = useRef(null);

  // state variable to track the ID of the sub-sub-category being edited
  const [editingSubSubCategoryId, setEditingSubSubCategoryId] = useState<string | null>(null);
  const [editingSubSubCategoryDescription, setEditingSubSubCategoryDescription] = useState('');


  const [isAddingSubSubCategory, setIsAddingSubSubCategory] = useState(false);
  const [newSubSubCategoryDescription, setNewSubSubCategoryDescription] = useState('');
  const [newSubSubCategoryURL, setNewSubSubCategoryURL] = useState('');

  const handleAddSubSubCategoryClick = useCallback(() => {
    setIsAddingSubSubCategory(true);
    setNewSubSubCategoryDescription('');
    setNewSubSubCategoryURL('');
  }, []);

  const dispatch = useAppDispatch();
  const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);
  // runs when the isEditing state changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  // runs when the isEditing state changes
  useEffect(() => {
    if (subSubCategoryTextareaRef.current) {
      subSubCategoryTextareaRef.current.focus();
      const length = subSubCategoryTextareaRef.current.value.length;
      subSubCategoryTextareaRef.current.setSelectionRange(length, length);
    }
  }, [isSubEditing]);

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


  /*
  * SubCategory methods
  * */
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
  * SubSubCategory methods
  * */
  const handleSubDelete = useCallback((subSubCategoryId) => {
    // Dispatch the delete action with the specific subSubCategoryId
    dispatch(deleteSubSubCategory(subSubCategoryId));
  }, [dispatch]);
  const handleSubCategoryTextInsertion = async () => {
    await getSubCategoryText(categoryId, description, shortCode, alwaysInsertFullText)
      .then(result => getCategoryStyleName(categoryId, backgroundColor)
      .then(categoryStyleName => insertText(result, categoryStyleName)));
  }

  const handleSubSubCategoryTextInsertion = async (subSubCategory: SubSubCategory) => {
    const codeToInsert = shortCode + "." + subSubCategory.shortCode
    await getSubCategoryText(categoryId, description + " - " + subSubCategory.description, codeToInsert, alwaysInsertFullText)
      .then(result => getCategoryStyleName(categoryId, backgroundColor)
      .then(categoryStyleName => {
        subSubCategory.url !== "" ? insertText(result, categoryStyleName) : insertTextWithUrl(result, categoryStyleName, subSubCategory.url)
      }));
  }
  const handleSubDelete = useCallback(() => {
    // dispatch(deleteSubCategory(id));
  }, [dispatch, id]);

  const handleSubEdit = (subSubCategoryId: string, currentDescription: string) => {
    setIsSubEditing(!isSubEditing);
    setEditingSubSubCategoryId(subSubCategoryId);
    setEditingSubSubCategoryDescription(currentDescription);
  };

  const handleSubSaveEdit = (subSubCategoryId: string) => {
    // Dispatch the update action with the subSubCategoryId and the new description.
    if (editingSubSubCategoryDescription.trim() !== '') {
      dispatch(updateSubSubCategory(subSubCategoryId, { description: editingSubSubCategoryDescription.trim() }));
    }

    // Reset the editing state after saving.
    setEditingSubSubCategoryId(null);
    setEditingSubSubCategoryDescription('');
  };

  const handleTextInsertion = useCallback(async () => {
    await insertAndHighlightText(categoryId, description, shortCode, url);
  }, [categoryId, description]);


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
          }} className={sectionClassNames.activeRowColorBlock}>&nbsp;</div>
        </div>
      </td>
      <td onClick={toggleFavorite} title={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}>
        <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
              className={`${sectionClassNames.menuIcon} ${isFavorite && "isFavorite"} ${isHovered && "showIcon"}`} />
      </td>
      <td onClick={handleEdit}>
        <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`} title="Wijzigen" />
      </td>
      <td onClick={!isEditing ? handleSubCategoryTextInsertion : undefined}
          style={{ width: "100%" }} className={sectionClassNames.sectionText}>
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
        </td>
        <td onClick={handleDelete}>
          <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                title="Verwijderen" />
        </td>
        <td></td>
      </div>
      {subSubCategories &&
        <table className={sectionClassNames.subSubCategoryTable}>
          <tbody>
          {subSubCategories.map((subSubCategory, index) => (
            <tr onMouseEnter={() => setIsSubHovered(true)} onMouseLeave={() => setIsSubHovered(false)}
                className={sectionClassNames.subSubCategoryRow} style={{ backgroundColor: backgroundColor + "1A" }}
                key={subSubCategory.id}>
              <td className={`${sectionClassNames.subSubCategoryFavoriteIcon}`} onClick={toggleFavorite}
                  title={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}>
                <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
                      className={`${sectionClassNames.menuIcon} ${isFavorite && "isFavorite"} ${isSubHovered && "showIcon"}`} />
              </td>

              {/*
                Edit icon for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryEditIcon}`}  onClick={() => handleSubEdit(subSubCategory.id, subSubCategory.description)}>
                <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isSubHovered && "showIcon"}`}
                      title="Wijzigen" />
              </td>

              {/*
                shortCode for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryShortCode}`}>{shortCode + "." + (index + 1)}</td>
              <td
                className={`${sectionClassNames.subSubCategoryDescription}`}
                onClick={() => handleSubSubCategoryTextInsertion(subSubCategory)}>{shortCode + "." + subSubCategory.shortCode + " " + subSubCategory.description}
              </td>

              {/*
                Delete icon for subSubCategory
              */}
              <td className={`${sectionClassNames.subSubCategoryDeleteIcon} `} onClick={() => handleSubDelete(subSubCategory.id)}>
                <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isSubHovered && "showIcon"}`}
                      title="Verwijderen" />
              </td>
            </tr>))}
          </tbody>
        </table>
      }
      {isAddingSubSubCategory && (
        <tr>
          <td colSpan={6}>
      <textarea
        placeholder="Beschrijving"
        value={newSubSubCategoryDescription}
        onChange={(e) => setNewSubSubCategoryDescription(e.target.value)}
        style={{ fontFamily: "Segoe UI", width: "90%" }}
      />
            <textarea
              placeholder="Hyperlink"
              value={newSubSubCategoryURL}
              onChange={(e) => setNewSubSubCategoryURL(e.target.value)}
              style={{ fontFamily: "Segoe UI", width: "90%" }}
            />
            <PrimaryButton onClick={handleSaveNewSubSubCategory}>Opslaan</PrimaryButton>
            &nbsp;
            <Button onClick={() => setIsAddingSubSubCategory(false)}>Annuleren</Button>
          </td>
        </tr>
      )}
    </>
  );
};

export default SubCategoryComponent;
