import { Dispatch, SetStateAction } from "react";

export interface CategoryHeaderProps {
    alwaysInsertFullText: boolean
    colour: string
    id: string
    isOpen: boolean
    code: string
    name: string
    setIsOpen: Dispatch<SetStateAction<boolean>>
    sections: number
}