import IconWithText from "../../icons/IconWithText";
import EditableTextArea from "../../input/EditableTextArea";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Button } from "@fluentui/react-components";
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { updateSubSubCategory } from "../../../middleware/modal/ModalMiddleware";
import { useAppDispatch } from "../../../redux/hooks";
import SubSubCategory from "../../../types/SubSubCategory";

const EditSubSubCategoryComponent: React.FC<
  {
    setEditingId: Dispatch<SetStateAction<string>>,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    subSubCategory: SubSubCategory
  }> = ({ setEditingId, setIsEditing, subSubCategory }) => {
  const [description, setDescription] = useState(subSubCategory.description);
  const [url, setUrl] = useState(subSubCategory.url);

  const textareaRef = useRef(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);


  const handleEditSave = () => {
    if (description.trim() !== "") {
      dispatch(updateSubSubCategory(subSubCategory.id, { description: description.trim(), url: url.trim() }));
    }

    resetEdit();
  };

  const resetEdit = () => {
    setEditingId(null);
    setIsEditing(false);
  };

  return <>
    <IconWithText icon={"Comment"} text={"Beschrijving"} />
    <EditableTextArea
      ref={textareaRef}
      placeholder={"beschrijving"}
      value={description}
      onChange={setDescription}
      onEnter={handleEditSave}
      onEscape={resetEdit} />

    <IconWithText icon={"Link"} text={"Hyperlink"} />
    <EditableTextArea
      placeholder={"https://www.voorbeeld.com"}
      value={url}
      onChange={setUrl}
      onEnter={handleEditSave}
      onEscape={resetEdit}
    />
    <PrimaryButton onClick={handleEditSave}>Opslaan</PrimaryButton>
    <Button onClick={resetEdit}>Annuleren</Button>
  </>
}

export default EditSubSubCategoryComponent;
