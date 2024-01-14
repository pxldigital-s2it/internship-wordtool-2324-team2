import { categoryClassNames } from "../category/maincategory/CategoryComponent.styles";
import * as React from "react";
import { ColourSquareProps } from "./ColourSquare.types";

const ColourSquare: React.FC<ColourSquareProps> = ({ colour = "#fff" }) => (<div
  className={categoryClassNames.colorSquare}
  style={{ backgroundColor: colour }}
/>);

export default ColourSquare;
