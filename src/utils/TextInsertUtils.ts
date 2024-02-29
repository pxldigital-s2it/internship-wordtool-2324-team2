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

export const insertAndHighlightWithUrl = (range: Word.Range, descriptionInsert: string, categoryStyleName: string, url: string) => {
    const html = `<a href="${url}">${url}</a>`;

    const thirdToLastIndex = descriptionInsert.length - url.length - 3;
    const descriptionInsertStart = descriptionInsert.slice(0, thirdToLastIndex) + " ";

    const insertedRangeStart = range.insertText(descriptionInsertStart, Word.InsertLocation.after);
    const insertedRangeUrl = insertedRangeStart.insertHtml(html, Word.InsertLocation.after);
    const insertedRangeEnd = insertedRangeUrl.insertText(") ", Word.InsertLocation.after);

    range.style = categoryStyleName;

    setRangesWithUrl(insertedRangeStart, insertedRangeUrl, insertedRangeEnd);
}

export const setRangesWithUrl = (startRange: Word.Range, urlRange: Word.Range, endRange: Word.Range) => {
    startRange.font.color = "red";
    startRange.font.highlightColor = "white";
    urlRange.font.color = "blue";
    urlRange.font.highlightColor = "white";
    endRange.font.color = "red";
    endRange.font.highlightColor = "white";
}