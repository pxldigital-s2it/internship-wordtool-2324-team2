import React from "react";
import Section from "../Section";
import { render } from "@testing-library/react";

describe('Section Test Suite', () => {
    test('Initial render', () => {
      const { getByText } = render(<Section />);
      expect(getByText('Section Content')).toBeInTheDocument();
    });
});
