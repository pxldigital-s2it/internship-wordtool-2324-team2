import { createContextMenu } from "../ContextMenu.utils";
import { fireEvent, render } from "@testing-library/react";
import { Menu } from "@fluentui/react-components";
import React from "react";
import { MenuItem } from "../ContextMenu.types";

describe("ContextMenu Utils Test Suite", () => {
  const createComponent = (menuItems: MenuItem[]) => (
    <Menu open={true}>
    {createContextMenu(menuItems)}
    </Menu>
  );

  test("Without Menu Items", () => {
    const { queryAllByRole } = render(createComponent([]));

    const menuItems = queryAllByRole("menuitem");
    expect(menuItems.length).toBe(0);
  });

  test("With Menu Items", () => {
    const items = [
      {
        handler: jest.fn(),
        label: "Label 1"
      },
      {
        handler: jest.fn(),
        label: "Label 2"
      }
    ];
    const { getAllByRole } = render(createComponent(items));

    const menuItems = getAllByRole("menuitem");
    expect(menuItems.length).toBe(2);

    menuItems.forEach(((menuItem, index) => {
      expect(menuItem).toHaveTextContent(`Label ${index + 1}`);
      fireEvent.click(menuItem);
      expect(items.at(index).handler).toHaveBeenCalledTimes(1);
    }));
  });

});