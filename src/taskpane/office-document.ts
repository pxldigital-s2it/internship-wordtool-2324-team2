/* eslint-disable */
/* global Word console */

import {getCategory} from "../middleware/modal/ModalMiddleware";

const insertText = async (categoryId: string, description: string) => {
  // Write text to the document.
  try {
      await Word.run(async (context) => {
          //let body = context.document.body;
          const range = context.document.getSelection();

          range.load("text");
          range.load("isEmpty");

          await context.sync();

          if (!(range.isEmpty)) {
              const category = await getCategory(categoryId);

              const insertedRange = range.insertText(" (" + description + ") ", Word.InsertLocation.after);
              range.font.color = "black";
              range.font.highlightColor = category.colour;

              insertedRange.font.color = "red";
              insertedRange.font.highlightColor = "white";
          }

          await context.sync();
      });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export default insertText;
