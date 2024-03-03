import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SubCategory from "../../../types/SubCategory";
import {
  deleteSubCategory,
  getCategoryDataById,
  updateSubCategoryIsFavorite
} from "../../../middleware/category/CategoryMiddleware";
import { updateSubCategory } from "../../../middleware/modal/ModalMiddleware";
import { sectionClassNames } from "./SubCategoryComponent.styles";
import { Icon } from "@fluentui/react";
import SubSubCategoryComponent from "../subsubcategory/SubSubCategoryComponent";
import { getCategoryStyleName, getSubCategoryText, insertText } from "../../../utils/TextInsertUtils";
import { selectAlwaysInsertFullText } from "../../../redux/settings/settings.slice";


const SubCategoryComponent: React.FC<SubCategory> = ({
                                                       id,
                                                       categoryId,
                                                       description,
                                                       isFavorite,
                                                       backgroundColor,
                                                       shortCode,
                                                       subSubCategories
                                                     }) => {
  const dispatch = useAppDispatch();
  const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);

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


  const [isAddingSubSubCategory, setIsAddingSubSubCategory] = useState(false);


  const handleAddSubSubCategoryClick = () => {
    setIsAddingSubSubCategory(true);
  };

  const handleTextInsertion = async () => {
    await getSubCategoryText(categoryId, description, shortCode, alwaysInsertFullText)
      .then(result => getCategoryStyleName(categoryId, backgroundColor)
        .then(categoryStyleName => insertText(result, categoryStyleName)));
  }

  return (
    <>
      <tr
        style={{
          width: "100%"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={sectionClassNames.section}
      >
        <td style={{ paddingRight: "6px" }}>
          <div style={{ width: "16px" }}>
            <div
              style={{
                backgroundColor: categoryDetails.colour || backgroundColor,
                height: isHovered ? "38px" : "32px",
                marginTop: "-1px",
                width: isHovered ? "16px" : "1px"
              }}
              className={sectionClassNames.activeRowColorBlock}
              title={shortCode + ". " + description}
            >&nbsp;
            </div>
          </div>
        </td>
        {/*// TODO: FAVORITE ICON + FUNCTIONALITY*/}
        <td onClick={toggleFavorite} title={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}>
          <Icon iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
                className={`${sectionClassNames.menuIcon} ${isFavorite && "isFavorite"} ${isHovered && "showIcon"}`} />
        </td>
        {/*// TODO: EDIT ICON + FUNCIONALITY*/}
        <td onClick={handleEdit}>
          <Icon iconName="Edit" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                title="Wijzigen" />
        </td>
        {/*// TODO: ADD ICON + FUNCTIONALITY*/}
        <td>
          <Icon iconName="CircleAddition" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                onClick={handleAddSubSubCategoryClick} title="Toevoegen" />
        </td>
        <td onClick={!isEditing ? handleTextInsertion : undefined}
            style={{ width: "100%" }} className={sectionClassNames.sectionText}>
          <div className={sectionClassNames.descriptionTextContainerDiv}>
            <div className={sectionClassNames.descriptionTextDiv} title={description}>
              {!isEditing
                ? (shortCode + ". " + description) :
                (<textarea
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
        {/*// TODO: DELETE ICON + FUNCTIONALITY*/}
        <td onClick={handleDelete}>
          <Icon iconName="Delete" className={`${sectionClassNames.menuIcon} ${isHovered && "showIcon"}`}
                title="Verwijderen" />
        </td>
        <td></td>
      </tr>
      <tr>
        {
          (subSubCategories && subSubCategories.length > 0 || isAddingSubSubCategory) &&
          <td colSpan={6}>
            <SubSubCategoryComponent
              subCategoryId={id}
              subSubCategories={subSubCategories}
              isAddingSubSubCategory={isAddingSubSubCategory}
              backgroundColor={backgroundColor}
              setIsAddingSubSubCategory={setIsAddingSubSubCategory}
              categoryId={categoryId}
              description={description}
              shortCode={shortCode}
            />
          </td>
        }
      </tr>
    </>
  );
};

export default SubCategoryComponent;
