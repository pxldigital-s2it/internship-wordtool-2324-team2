/* eslint-disable */
/* global Word console */

import { getCategory } from "../../../middleware/modal/ModalMiddleware";
import Category from "../../../types/Category";
import {getCategoryStyleName, insertAndHighlight, insertAndHighlightWithUrl} from "../../../utils/TextInsertUtils";

async function getInsertText(description: string, context: Word.RequestContext, category: Category, shortCode: string, url: string ) {
    // zoeken op het eerste deel omdat url er niet in kan staan om te zoeken
    let descriptionInsert = " (" + category.title + " - " + description;
    const searchResults = context.document.body.search(descriptionInsert);

    searchResults.load("items");
    await context.sync();

    if (searchResults.items?.length) {
        descriptionInsert = " (" + category.code + " " + shortCode + ") ";
    } else {
        descriptionInsert = descriptionInsert  + (url ? " " + url : "") + ") "
    }

    return descriptionInsert;
}

export const insertAndHighlightText = async (categoryId: string, description: string, shortCode: string, url: string) => {
    try {
        await Word.run(async (context) => {
            const range = context.document.getSelection();

            range.load("text");
            range.load("isEmpty");
            range.load("style");

            await context.sync();

            if (!(range.isEmpty)) {
                const styles = context.document.getStyles();
                const category = await getCategory(categoryId);

                url = "https://www.google.com";

                styles.load("getByNameOrNullObject");

                await context.sync();

                const categoryStyleName = await getCategoryStyleName(categoryId, styles, context, category);
                const descriptionInsert = await getInsertText(description, context, category, shortCode, url);

                descriptionInsert.includes(url) ? insertAndHighlightWithUrl(range, descriptionInsert, categoryStyleName, url) :
                    insertAndHighlight(range, descriptionInsert, categoryStyleName);
            }

            await context.sync();
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};