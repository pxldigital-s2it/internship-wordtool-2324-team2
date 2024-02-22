import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useBoolean } from '@fluentui/react-hooks';


const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450, zIndex: 2147483647 } };
const dialogContentProps = {
    type: DialogType.normal,
    title: 'Contrast waarschuwing',
    subText: 'Deze kleur heeft een slecht contrast met zwart. Wil je deze toch gebruiken?',
};

export const ContrastWarning: React.FunctionComponent<{saveData: () => void, showDialog, setShowDialog}> = ( {saveData, showDialog, setShowDialog}) => {
    const toggleDialogVisibility = () => {
        setShowDialog(!showDialog);
    }
    
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const modalProps = React.useMemo(
        () => ({
            isBlocking: true,
            styles: modalPropsStyles,
            dragOptions: isDraggable ? dragOptions : undefined,
        }),
        [isDraggable],
    );

    return (
        <>
            <Dialog
                hidden={!showDialog}
                onDismiss={toggleDialogVisibility}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
            >
                <DialogFooter>
                    <PrimaryButton onClick={saveData} text="Ja" />
                    <DefaultButton onClick={toggleDialogVisibility} text="Nee" />
                </DialogFooter>
            </Dialog>
        </>
    );
};
