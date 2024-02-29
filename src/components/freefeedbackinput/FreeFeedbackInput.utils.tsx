/* eslint-disable */
/* global Word console */

import {getCategory} from "../../middleware/modal/ModalMiddleware";
import Category from "../../types/Category";
import {
    getCategoryStyleName,
    insertAndHighlight,
    insertAndHighlightWithUrl,
    setRangesWithUrl
} from "../../utils/TextInsertUtils";

async function getInsertText(category: Category, freeFeedback: string, url: string) {
    return " (" + category.title + (freeFeedback ? " - " + freeFeedback : "") + (url ? " " + url : "") + ") ";
}

export const insertFreeFeedbackAndHighlightText = async (categoryId: string, freeFeedback: string, url: string) => {
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

                const categoryStyleName = await getCategoryStyleName(categoryId, category.colour);
                const descriptionInsert = await getInsertText(category, freeFeedback, url);

                (url !== "" && descriptionInsert.includes(url)) ? insertAndHighlightWithUrl(range, descriptionInsert, categoryStyleName, url) :
                    insertAndHighlight(range, descriptionInsert, categoryStyleName);
            }

            await context.sync();
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const insertFreeFeedback = async (text: string, url: string) => {
    try {
        await Word.run(async (context) => {
            if (text !== "") {
                const range = context.document.getSelection();

                if (url) {
                    const html = `<a href="${url}">${url}</a>`;

                    const insertedRangeStart = range.insertText(" (" + text + " ", "End");
                    const insertedRangeUrl = insertedRangeStart.insertHtml(html, "End");
                    const insertedRangeEnd = insertedRangeUrl.insertText(") ", "End");

                    setRangesWithUrl(insertedRangeStart, insertedRangeUrl, insertedRangeEnd);
                } else {
                    const insertedRange = range.insertText(" (" + text + ") ", "End");

                    insertedRange.font.color = "red";
                    insertedRange.font.highlightColor = "white";
                }

                await context.sync();
            }
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};
