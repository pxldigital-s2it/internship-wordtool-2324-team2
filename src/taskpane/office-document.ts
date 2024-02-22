/* eslint-disable */
/* global Word console */

import { getCategory } from "../middleware/modal/ModalMiddleware";
import Category from "../types/Category";

async function getCategoryStyleName(categoryId: string, styles: Word.StyleCollection, context: Word.RequestContext, category: Category) {
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

async function getInsertText(description: string, context: Word.RequestContext, category: Category, shortCode: string, freeFeedback: string) {
    let descriptionInsert = " (" + category.title +
        (shortCode ? " - " + description : "") +
        ") ";
    const searchResults = context.document.body.search(descriptionInsert);

    searchResults.load("items");
    await context.sync();

    if (searchResults.items?.length && !freeFeedback) {
        descriptionInsert = " (" + category.code + " " + shortCode + ") ";
    } else if (freeFeedback) {
        const thirdToLastIndex = descriptionInsert.length - 2;
        descriptionInsert =
            descriptionInsert.slice(0, thirdToLastIndex) +
            " - " + freeFeedback +
            descriptionInsert.slice(thirdToLastIndex);
    }

    return descriptionInsert;
}

function insertAndHighlight(range: Word.Range, descriptionInsert: string, categoryStyleName: string) {
    const insertedRange = range.insertText(descriptionInsert, Word.InsertLocation.after);
    range.style = categoryStyleName;

    insertedRange.font.color = "red";
    insertedRange.font.highlightColor = "white";
}

export const insertAndHighlightText = async (categoryId: string, description: string, shortCode?: string, freeFeedback?: string) => {
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
                const descriptionInsert = await getInsertText(description, context, category, shortCode, freeFeedback);

                insertAndHighlight(range, descriptionInsert, categoryStyleName);
            }

            await context.sync();
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const insertFreeFeedback = async (text: string) => {
    try {
        await Word.run(async (context) => {
            if (text !== "") {
                const range = context.document.getSelection();

                const insertedRange = range.insertText(" (" + text + ") ", "End");

                insertedRange.font.color = "red";
                insertedRange.font.highlightColor = "white";

                await context.sync();
            }
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};
