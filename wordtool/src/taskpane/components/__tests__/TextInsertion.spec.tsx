import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextInsertion from "../TextInsertion";
import insertText from "../../office-document";

jest.mock("../../office-document");

describe("TextInsertion Test Suite", () => {

  it("should render the TextInsertion component", () => {
    const { container } = render(<TextInsertion />);

    expect(container).toMatchSnapshot();
  });

  test("Insert text", () => {
    const { getByText } = render(<TextInsertion />);

    fireEvent.click(getByText("Insert text"));

    expect(insertText).toHaveBeenCalledWith("Some text.");
  });

  test("Change text", () => {
    const { getByLabelText, getByText } = render(<TextInsertion />);
    const newText = "Some other text.";

    /*
     *  Useful trick to log html structure to help debug -> https://testing-library.com/docs/dom-testing-library/api-debugging/#screendebug
     *  Uncomment next line to see output in console.
     */
    // screen.debug(getByLabelText("Enter text to be inserted into the document."));

    fireEvent.change(getByLabelText("Enter text to be inserted into the document."), {
      target: { value: newText },
    });
    fireEvent.click(getByText("Insert text"));

    expect(insertText).toHaveBeenCalledWith(newText);
  });

});
