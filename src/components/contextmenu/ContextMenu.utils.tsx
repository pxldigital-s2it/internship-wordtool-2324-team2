import * as React from "react";
import { MenuItem, MenuList, MenuPopover } from "@fluentui/react-components";

import type { MenuItem as IMenuItem } from "./ContextMenu.types";


export const createContextMenu = (menuItems: IMenuItem[]) => (
  <MenuPopover>
    <MenuList>
      {menuItems.map(({ label, handler }, index: number) => (
        <MenuItem onClick={handler} key={index}>{label}</MenuItem>
      ))}
    </MenuList>
  </MenuPopover>
);