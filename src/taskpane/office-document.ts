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

              let categoryStyleName = categoryId + "Style";
              let categoryStyle = styles.getByNameOrNullObject(categoryStyleName);
              categoryStyle.load("isNullObject");
              categoryStyle.load("nameLocal");
              categoryStyle.load("shading");
              categoryStyle.load("font");
              categoryStyle.shading.load("backgroundPatternColor");
              categoryStyle.font.load("color")

              await context.sync();

              console.log("categoryStyleNull: " + categoryStyle.isNullObject);
              console.log("categoryStyleName: " + categoryStyle.nameLocal);

              if (categoryStyle.isNullObject) {
                  console.log("went into if statement with null object style");
                  console.log("1");
                  categoryStyle.font.color = "green";
                  console.log("2");
                  categoryStyle.shading.backgroundPatternColor = category.colour.toUpperCase();
                  console.log("3");
                  context.document.addStyle(categoryStyleName, "Character");
                  console.log("4");

                  await context.sync();
              }

              console.log("5");
              const insertedRange = range.insertText(" (" + description + ") ", Word.InsertLocation.after);
              range.style = categoryStyleName;
              await context.sync();
              console.log("range.style: " + range.style);

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
