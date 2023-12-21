import * as React from "react";

import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
} from "@fluentui/react-components";

import type {
    MenuProps,
    MenuTriggerChildProps,
} from "@fluentui/react-components";

const CustomMenuTrigger = React.forwardRef<
    HTMLDivElement,
    Partial<MenuTriggerChildProps>
>((props, ref) => {
    return (
        <div {...props} ref={ref}>
            Custom Trigger
        </div>
    );
});

export const CustomTrigger = ({menu1, menu2, menu3}) => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps["onOpenChange"] = (_e, data) => {
        setOpen(data.open);
    };

    return (
        <Menu open={open} onOpenChange={onOpenChange} openOnContext={true}>
            <MenuTrigger disableButtonEnhancement>
                <CustomMenuTrigger />
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    <MenuItem>{menu1}</MenuItem>
                    <MenuItem>{menu2}</MenuItem>
                    <MenuItem>{menu3}</MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};



// export const AligningWithIcons = ({title, menu1, menu2, menu3}) => (
//     <Menu hasIcons openOnContext={true}>
//         <MenuTrigger disableButtonEnhancement>
//             <Button>{title}</Button>
//         </MenuTrigger>
//         <MenuPopover>
//             <MenuList>
//                 <MenuItem>{menu1}</MenuItem>
//                 <MenuItem >{menu2}</MenuItem>
//                 <MenuItem>{menu3}</MenuItem>
//             </MenuList>
//         </MenuPopover>
//     </Menu>
// );