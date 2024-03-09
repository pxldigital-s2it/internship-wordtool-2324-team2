/* eslint-disable */
/* global Word console */

import { getCategory } from "../middleware/modal/ModalMiddleware";
import { prepareExport } from "./StorageUtils";
import Category from "../types/Category";
import SubCategory from "../types/SubCategory";
import SubSubCategory from "../types/SubSubCategory";

export const getCategoryText = async (title: string, shortTitle: string, alwaysInsertFullText: boolean) => {
  let result = ` (${title}) `;
  if (!alwaysInsertFullText) {
    await Word.run(async (context) => {
      const searchResults = await findMatchingTextInDocument(context, result);
      if (searchResults.items?.length) {
        result = ` (${shortTitle}) `;
      }
    });
  }

  return result;
};

export const getSubCategoryText = async (categoryId: string, title: string, shortTitle: string, alwaysInsertFullText: boolean) => {
  const category = await getCategory(categoryId);
  let result = ` (${category.title} - ${title}) `;

  if (!alwaysInsertFullText) {
    await Word.run(async (context) => {
      const searchResults = await findMatchingTextInDocument(context, result);
      if (searchResults.items?.length) {
        result = ` (${category.code} ${shortTitle}) `;
      }
    });
  }

  return result;
};

const findMatchingTextInDocument = async (context: Word.RequestContext, insertText: string) => {
  const searchResults = context.document.body.search(insertText);
  searchResults.load("items");
  await context.sync();

  return searchResults;
};

export const getCategoryStyleName = async (categoryId: string, colour: string) => {
  const regex = /[^a-zA-Z0-9]/g; // regex to get special characters
  const categoryStyleName = categoryId.replace(regex, "") + "Style";

  await Word.run(async (context) => {
    const styles = context.document.getStyles();
    styles.load("getByNameOrNullObject");
    await context.sync();


    let categoryStyle = styles.getByNameOrNullObject(categoryStyleName);
    categoryStyle.load("isNullObject");
    await context.sync();

    if (categoryStyle.isNullObject) {
      categoryStyle = context.document.addStyle(categoryStyleName, "Character");
      categoryStyle.font.color = "black";
      categoryStyle.shading.backgroundPatternColor = colour;

      await context.sync();
    }

    context.trackedObjects.add(categoryStyle);
  });

  return categoryStyleName;
};

async function getRange(context: Word.RequestContext) {
  const range = context.document.getSelection();
  range.load("text");
  range.load("isEmpty");
  range.load("style");
  await context.sync();

  return range;
}

export const writeExport = async () => {
  await Word.run(async (context) => {
    const range = context.document.getSelection();
    range.insertText(prepareExport(), "End");
    await context.sync();
  });
};

export const readImport = async () => {
  let data:{ categories: Category[], subCategories: SubCategory[], subSubCategories: SubSubCategory[] };
  await Word.run(async (context) => {
    const range = context.document.body;
    range.load("text");
    await context.sync();

    data = JSON.parse(range.text?.trim() || "");
  });

  return data;
};


export const insertText = async (text: string, categoryStyle: string) => {
  await Word.run(async (context) => {
    const range = await getRange(context);
    if (!(range.isEmpty)) {
      insertAndHighlight(range, text, categoryStyle);
    }

    await context.sync();
  });
};

export const insertTextWithUrl = async (text: string, categoryStyle: string, url: string) => {
  await Word.run(async (context) => {
    const range = await getRange(context);
    if (!(range.isEmpty)) {
      insertAndHighlightWithUrl(range, text, categoryStyle, url);
    }

    await context.sync();
  });
};

export const insertAndHighlight = (range: Word.Range, descriptionInsert: string, categoryStyleName: string) => {
  const insertedRange = range.insertText(descriptionInsert, "After");
  range.style = categoryStyleName;

  insertedRange.font.color = "red";
  insertedRange.font.highlightColor = "white";
};

export const insertAndHighlightWithUrl = (range: Word.Range, descriptionInsert: string, categoryStyleName: string, url: string) => {
  const html = `<a href="${url}">${url}</a>`;

  const descriptionInsertStart = descriptionInsert.slice(0, descriptionInsert.indexOf(") ")) + " - ";

  const insertedRangeStart = range.insertText(descriptionInsertStart, Word.InsertLocation.after);
  const insertedRangeUrl = insertedRangeStart.insertHtml(html, Word.InsertLocation.after);
  const insertedRangeEnd = insertedRangeUrl.insertText(") ", Word.InsertLocation.after);

  range.style = categoryStyleName;

  setRangesWithUrl(insertedRangeStart, insertedRangeUrl, insertedRangeEnd);
};

export const setRangesWithUrl = (startRange: Word.Range, urlRange: Word.Range, endRange: Word.Range) => {
  startRange.font.color = "red";
  startRange.font.highlightColor = "white";
  urlRange.font.color = "blue";
  urlRange.font.highlightColor = "white";
  endRange.font.color = "red";
  endRange.font.highlightColor = "white";
};
