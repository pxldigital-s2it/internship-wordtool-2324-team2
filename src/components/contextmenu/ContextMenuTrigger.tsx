import * as React from "react";
import { forwardRef, ReactNode } from "react";

import type { MenuTriggerChildProps } from "@fluentui/react-components";


const ContextMenuTrigger = forwardRef<HTMLDivElement, Partial<MenuTriggerChildProps> & {
  children?: ReactNode
}>((props, ref) =>
  (
    <div {...props} ref={ref}>
      { props.children }
    </div>
  ));

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export default ContextMenuTrigger;