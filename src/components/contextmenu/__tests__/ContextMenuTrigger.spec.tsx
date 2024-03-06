import React from "react";
import { render } from "@testing-library/react";
import ContextMenuTrigger from "../ContextMenuTrigger";

describe("ContextMenuTrigger Test Suite", () => {

    test("Renders correctly with children", () => {
        const { container } = render(<ContextMenuTrigger><h1>Test</h1></ContextMenuTrigger>);

        expect(container).toMatchSnapshot();
    });

});