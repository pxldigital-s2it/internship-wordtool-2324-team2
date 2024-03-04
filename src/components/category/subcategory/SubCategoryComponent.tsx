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
import SubSubCategoryComponent from "../subsubcategory/SubSubCategoryComponent";
import { getCategoryStyleName, getSubCategoryText, insertText } from "../../../utils/TextInsertUtils";
import { selectAlwaysInsertFullText } from "../../../redux/settings/settings.slice";
import TableButton from "../../buttons/TableButton";
import EditableTextArea from "../../input/EditableTextArea";


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
        <TableButton
          tdClassName={""}
          clickHandler={toggleFavorite}
          iconName={isFavorite ? "FavoriteStarFill" : "FavoriteStar"}
          iconClassName={sectionClassNames.menuIcon}
          iconTitle={isFavorite ? "Uit Favorieten verwijderen" : "Aan Favorieten toevoegen"}
          showIconCondition={isHovered}
        />
        <TableButton
          tdClassName={""}
          clickHandler={handleEdit}
          iconName={"Edit"}
          iconClassName={sectionClassNames.menuIcon}
          iconTitle={"Wijzigen"}
          showIconCondition={isHovered}
        />
        <TableButton
          tdClassName={""}
          clickHandler={handleAddSubSubCategoryClick}
          iconName={"CircleAddition"}
          iconClassName={sectionClassNames.menuIcon}
          iconTitle={"Toevoegen"}
          showIconCondition={isHovered}
        />
        <td onClick={!isEditing ? handleTextInsertion : undefined}
            style={{ width: "100%" }} className={sectionClassNames.sectionText}>
          <div className={sectionClassNames.descriptionTextContainerDiv}>
            <div className={sectionClassNames.descriptionTextDiv} title={description}>
              {!isEditing
                ? (shortCode + ". " + description) :
                (
                  <EditableTextArea
                    ref={textareaRef}
                    placeholder={""}
                    value={tempDescription}
                                    onChange={setTempDescription}
                    onEnter={() => {
                      setIsEditing(false);
                      dispatch(updateSubCategory(id, { description: tempDescription }));
                    }}
                    onEscape={() => {
                      setIsEditing(false);
                      setTempDescription(description);
                  }}
                  onBlur={handleBlur}
                  />
                )}
            </div>
          </div>
        </td>
        <TableButton
          tdClassName={""}
          clickHandler={handleDelete}
          iconName={"Delete"}
          iconClassName={sectionClassNames.menuIcon}
          iconTitle={"Verwijderen"}
          showIconCondition={isHovered}
        />
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
