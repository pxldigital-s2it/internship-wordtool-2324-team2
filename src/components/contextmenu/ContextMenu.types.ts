import { ReactNode } from "react";


export interface ContextMenuProps {
  trigger: ReactNode
  menuItems: MenuItem[]
}

export interface MenuItem {
  handler: () => void
  label: string
}