import { Dispatch, SetStateAction } from "react";

export interface CategoryHeaderProps {
  colour: string
  id: string
  isOpen: boolean
  name: string
  setIsOpen:  Dispatch<SetStateAction<boolean>>
  sections: number
}
