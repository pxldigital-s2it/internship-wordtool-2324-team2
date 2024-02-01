/* eslint-disable */
/* global Word console */

import {getCategory} from "../middleware/modal/ModalMiddleware";

const insertText = async (categoryId: string, description: string) => {
  // Write text to the document.
  try {
      await Word.run(async (context) => {
          const range = context.document.getSelection();

          range.load("text");
          range.load("isEmpty");
          range.load("style");

          await context.sync();

          if (!(range.isEmpty)) {
              let styles = context.document.getStyles();
              const category = await getCategory(categoryId);

              styles.load("getByNameOrNullObject");

              await context.sync();

              const regex = /[^a-zA-Z0-9]/g; // regex to get special characters
              const categoryStyleName = categoryId.replace(regex, "") + "Style";
              let categoryStyle = styles.getByNameOrNullObject(categoryStyleName);
              categoryStyle.load("isNullObject");

              await context.sync();

              if (categoryStyle.isNullObject) {
                  console.log("went into if statement")
                  categoryStyle = context.document.addStyle(categoryStyleName, "Character");
                  categoryStyle.font.color = "black";
                  categoryStyle.shading.backgroundPatternColor = category.colour;

                  console.log("before sync in if")
                  await context.sync();
              }

              const insertedRange = range.insertText(" (" + description + ") ", Word.InsertLocation.after);
              range.style = categoryStyleName;

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
