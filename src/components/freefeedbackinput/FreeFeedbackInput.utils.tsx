/* eslint-disable */
/* global Word console */

import { getCategory } from "../../middleware/modal/ModalMiddleware";
import Category from "../../types/Category";
import { getCategoryStyleName, insertAndHighlight } from "../../utils/TextInsertUtils";

async function getInsertText(category: Category, freeFeedback: string) {
  return " (" + category.title + (freeFeedback ? " - " + freeFeedback : "") + ") ";
}

export const insertFreeFeedbackAndHighlightText = async (categoryId: string, freeFeedback: string) => {
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
        const descriptionInsert = await getInsertText(category, freeFeedback);

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
      }

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
