import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent, DialogSurface,
    DialogTitle
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectDisabled, selectOpen, setConfirmBeingHandled, setDisabled } from "../../redux/contrastwarningalert/contrastwarningalert.slice";
import { closeContrastWarningAlert } from "../../middleware/contrastwarningalert/ContrastWarningAlertMiddleware";

export const ContrastWarning: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(selectOpen);
    const disabled = useAppSelector(selectDisabled);
    
    const closeAlert = () => {
        dispatch(closeContrastWarningAlert());
    }
    
    const handleConfirm = () => {
        dispatch(setDisabled(true));
        dispatch(setConfirmBeingHandled(true));
    }
    
    return (
        <Dialog modalType="alert" open={open}>
            <DialogSurface aria-describedby={undefined}>
                <DialogBody >
                    <DialogTitle action={null}>Contrast waarschuwing</DialogTitle>
                    <DialogContent>
                        Deze kleur heeft een slecht contrast met zwart. Wil je deze toch gebruiken?
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="primary" disabled={disabled} onClick={handleConfirm}>Ja</Button>
                        <Button appearance="secondary" disabled={disabled} onClick={closeAlert}>Nee</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default ContrastWarning;