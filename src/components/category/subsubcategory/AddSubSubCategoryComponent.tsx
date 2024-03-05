import { sectionClassNames } from "../subcategory/SubCategoryComponent.styles";
import TableButton from "../../buttons/TableButton";
import IconWithText from "../../icons/IconWithText";
import EditableTextArea from "../../input/EditableTextArea";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Button } from "@fluentui/react-components";
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { saveSubSubCategory } from "../../../middleware/modal/ModalMiddleware";
import { useAppDispatch } from "../../../redux/hooks";

interface AddSubSubCategoryComponentProps {
  backgroundColor: string;
  setIsAddingSubSubCategory:  Dispatch<SetStateAction<boolean>>;
  subCategoryId: string;
}

const AddSubSubCategoryComponent: React.FC<AddSubSubCategoryComponentProps> = ({ backgroundColor, setIsAddingSubSubCategory, subCategoryId }) => {

  const newTextareaRef = useRef(null);
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newTextareaRef.current) {
      newTextareaRef.current.focus();
      const length = newTextareaRef.current.value.length;
      newTextareaRef.current.setSelectionRange(length, length);
    }
  }, []);


  const resetSaveState = () => {
    setIsAddingSubSubCategory(false);
    setNewDescription("");
    setNewUrl("");
  };

  const handleSave = () => {
    dispatch(saveSubSubCategory({
      description: newDescription.trim().length > 0 ? newDescription : "Nieuwe ondertitel",
      subCategoryId,
      url: newUrl
    }));
    resetSaveState();
  };

  return (<tr
      className={sectionClassNames.subSubCategoryRow}
      style={{ backgroundColor: backgroundColor + "1A" }}
    >

      <TableButton
        tdClassName={""}
        clickHandler={() => {}}
        iconName={"Add"}
        iconClassName={sectionClassNames.menuIcon}
        iconTitle={"Nieuwe ondertitel"}
        showIconCondition={true}
      />

      <td />

      <td colSpan={4}>

        <IconWithText icon={"Comment"} text={"Beschrijving"} />
        <EditableTextArea
          ref={newTextareaRef}
          placeholder="Beschrijving"
          value={newDescription}
          onChange={setNewDescription}
          onEnter={handleSave}
          onEscape={resetSaveState}
        />

        <IconWithText icon={"Link"} text={"Hyperlink"} />
        <EditableTextArea
          placeholder="https://www.voorbeeld.com"
          value={newUrl}
          onChange={setNewUrl}
          onEnter={handleSave}
          onEscape={resetSaveState}
        />

        <PrimaryButton onClick={handleSave}>Opslaan</PrimaryButton>
        &nbsp;
        <Button onClick={() => setIsAddingSubSubCategory(false)}>Annuleren</Button>
      </td>
    </tr>
  );
};

export default AddSubSubCategoryComponent;
