import * as React from "react";
import { Menu, MenuProps, MenuTrigger } from "@fluentui/react-components";
import ContextMenuTrigger from "./ContextMenuTrigger";
import { createContextMenu } from "./ContextMenu.utils";

import type { ContextMenuProps } from "./ContextMenu.types";


const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, menuItems }) => {

    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps["onOpenChange"] = (_, data) => {
        setOpen(data.open);
    };

    return (
        <Menu open={open} onOpenChange={onOpenChange} openOnContext={true}>
            <MenuTrigger disableButtonEnhancement>
                <ContextMenuTrigger>
                    {trigger}
                </ContextMenuTrigger>
            </MenuTrigger>
            {createContextMenu(menuItems)}
        </Menu>
    );

};

export default ContextMenu;