import * as React from "react";
import { Dialog, DialogSurface } from "@fluentui/react-components";
import { useAppSelector } from "../../redux/hooks";
import { selectOpen } from "../../redux/modal/modal.slice";
import CategoryForm from "../../forms/CategoryForm";


const Modal = () => {
    const open = useAppSelector(selectOpen);

    return (
        <Dialog modalType="non-modal" open={open}>
            <DialogSurface aria-describedby={undefined} backdrop={''}>
                <CategoryForm/>
            </DialogSurface>
        </Dialog>
    );
};

export default Modal;