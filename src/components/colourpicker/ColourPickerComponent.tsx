import React, { useState } from "react";
import ColourPicker from "./ColourPicker";
import ColourSquare from "./ColourSquare";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectColour, setColour } from "../../redux/category/category.slice";
import { Button } from "@fluentui/react-components";

const ColourPickerComponent = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const colour = useAppSelector(selectColour);

  const handleSelectColour = (colour: string) => {
    dispatch(setColour(colour));
  };

  return (open
    ? <>
      <ColourPicker selectedColor={colour} setSelectedColor={handleSelectColour} />
      <Button onClick={() => setOpen(false)}>Deze kleur</Button>
      </>
    : <div onClick={() => setOpen(true)}>
      <ColourSquare colour={colour} />
    </div>);
};

export default ColourPickerComponent;
