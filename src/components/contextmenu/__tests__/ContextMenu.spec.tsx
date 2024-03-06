import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ContextMenu from "../ContextMenu";


describe("ContextMenu Test Suite", () => {

    const trigger = <h1 role="trigger">Trigger</h1>;
    const menuItems = [{ handler: jest.fn(), label: "Label 1" }];
    const renderComponent = () => (render(<ContextMenu trigger={trigger} menuItems={menuItems}/>));

    test("Initial render", () => {
        const { baseElement } = renderComponent();

        expect(baseElement).toMatchSnapshot();
    });

    test("Initially open = false", () => {
        const { queryByRole } = renderComponent();

        expect(queryByRole("menu")).not.toBeInTheDocument();
    });

    test("onOpenChange", () => {
        const { getByRole } = renderComponent();

        fireEvent.contextMenu(getByRole("trigger"));

        expect(getByRole("menu")).toBeInTheDocument();
    });

});