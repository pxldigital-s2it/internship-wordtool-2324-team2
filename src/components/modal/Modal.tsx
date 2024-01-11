import * as React from "react";
import { Dialog, DialogSurface } from "@fluentui/react-components";
import { useAppSelector } from "../../redux/hooks";
import { selectOpen } from "../../redux/modal/modal.slice";
import NewSubCategoryForm from "../../forms/CategoryForm";


const Modal = () => {
  const open = useAppSelector(selectOpen);

  return (
    <Dialog modalType="non-modal" open={open}>
      <DialogSurface aria-describedby={undefined}>
        <NewSubCategoryForm />
      </DialogSurface>
    </Dialog>
  );
};

export default Modal;
