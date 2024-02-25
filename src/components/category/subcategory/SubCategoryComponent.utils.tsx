/* eslint-disable */
/* global Word console */

import { getCategory } from "../../../middleware/modal/ModalMiddleware";
import Category from "../../../types/Category";
import { getCategoryStyleName, insertAndHighlight } from "../../../utils/TextInsertUtils";

async function getInsertText(description: string, context: Word.RequestContext, category: Category, shortCode: string) {
    let descriptionInsert = " (" + category.title + description + ") ";
    const searchResults = context.document.body.search(descriptionInsert);

    searchResults.load("items");
    await context.sync();

    if (searchResults.items?.length) {
        descriptionInsert = " (" + category.code + " " + shortCode + ") ";
    }

    return descriptionInsert;
}

export const insertAndHighlightText = async (categoryId: string, description: string, shortCode: string) => {
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

                styles.load("getByNameOrNullObject");

                await context.sync();

                const categoryStyleName = await getCategoryStyleName(categoryId, styles, context, category);
                const descriptionInsert = await getInsertText(description, context, category, shortCode);

                insertAndHighlight(range, descriptionInsert, categoryStyleName);
            }

            await context.sync();
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};