import { Input, Label, TableCell, TableRow, Text, Textarea } from "@fluentui/react-components";
import * as React from "react";
import { MutableRefObject } from "react";
import Category from "../../types/Category";
import SubCategory from "../../types/SubCategory";
import { isCategory } from "../../types/IsType";
import FieldType from "../../types/FieldType";
import { ColourPickerComponent } from "../../components";
import { DisplayableCategory } from "./FormUtils.types";

export const formatData = (data: Category | SubCategory, categoryTitle?: string) => {
    if (isCategory(data)) {
        return [
            {
                content: data.title,
                id: "title",
                label: "Titel:",
                type: FieldType.INPUT
            },
            {
                content: data.code,
                id: "code",
                label: "Code:",
                type: FieldType.INPUT
            },
            {
                content: data.colour,
                id: "colour",
                label: "Kleur:",
                type: FieldType.COLOUR_INPUT
            }
        ];
    }
    return [
        {
            content: `[${categoryTitle || "Categorie onbekend"}]`,
            id: "category",
            label: "Categorie:",
            type: FieldType.TEXT
        },
        {
            content: data.description || "",
            id: "description",
            label: "Beschrijving:",
            type: FieldType.TEXTAREA
        }
    ];
};

const renderCell = (type: FieldType, id: string, content: string) => {
    let cell;
    switch (type) {
        case FieldType.LABEL:
            cell = <Label htmlFor={`${id}-input`}>{content}</Label>;
            break;
        case FieldType.TEXT:
            cell = <Text>{content}</Text>;
            break;
        case FieldType.INPUT:
            cell = <Input appearance="underline" required type="text" id={`${id}-input`} defaultValue={content}/>;
            break;
        case FieldType.TEXTAREA:
            cell = <Textarea appearance="outline" required id={`${id}-input`} defaultValue={content}/>;
            break;
        case FieldType.COLOUR_INPUT:
            cell = <ColourPickerComponent/>;
    }

    return <TableCell style={{ width: type === FieldType.LABEL && '20%' }}>{cell}</TableCell>;
};

export const renderRow = (data: DisplayableCategory) =>
    (<TableRow appearance="brand" key={data.id}>
        {renderCell(FieldType.LABEL, data.id, data.label)}
        {renderCell(data.type, data.id, data.content)}
    </TableRow>);

export const getFormField = (
    formRef: MutableRefObject<HTMLFormElement>,
    inputId: string
): RadioNodeList | Element | null => {
    return formRef?.current?.elements.namedItem(`${inputId}-input`);
};

export const readFormField = (
    formRef: MutableRefObject<HTMLFormElement>,
    inputId: string
): string => {
    const inputElement = getFormField(formRef, inputId) as HTMLInputElement;
    return inputElement.value;
};