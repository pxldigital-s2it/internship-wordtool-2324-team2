/* eslint-disable */
/* global Word console */

import Category from "../types/Category";

export const getCategoryStyleName = async (categoryId: string, styles: Word.StyleCollection, context: Word.RequestContext, category: Category) => {
    const regex = /[^a-zA-Z0-9]/g; // regex to get special characters
    const categoryStyleName = categoryId.replace(regex, "") + "Style";
    let categoryStyle = styles.getByNameOrNullObject(categoryStyleName);
    categoryStyle.load("isNullObject");

    await context.sync();

    if (categoryStyle.isNullObject) {
        categoryStyle = context.document.addStyle(categoryStyleName, "Character");
        categoryStyle.font.color = "black";
        categoryStyle.shading.backgroundPatternColor = category.colour;

        await context.sync();
    }

    return categoryStyleName;
}

export const insertAndHighlight = (range: Word.Range, descriptionInsert: string, categoryStyleName: string) => {
    const insertedRange = range.insertText(descriptionInsert, Word.InsertLocation.after);
    range.style = categoryStyleName;

    insertedRange.font.color = "red";
    insertedRange.font.highlightColor = "white";
}