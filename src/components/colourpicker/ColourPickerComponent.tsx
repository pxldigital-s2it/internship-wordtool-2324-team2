import React, { useState, useEffect } from "react";
import ColourPicker from "./ColourPicker";
import ColourSquare from "./ColourSquare";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectColour, setColour } from "../../redux/category/category.slice";
import { Button } from "@fluentui/react-components";
import { isLowContrast } from "../../utils/ContrastUtils";
import { hexToRgb } from "../../utils/ColorUtils";
import { ColourObject } from "../../types/ColourObject";
import { RGBColour } from "../../types/RGBColour";

// Updated getColorObject function
const getColorObject = (color): ColourObject => {
    if (!color) {
        color = "#ffffff";
    }
    
    const rgbColour: RGBColour = hexToRgb(color);
    return new ColourObject(rgbColour, color);
};

const ColourPickerComponent = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const colour = useAppSelector(selectColour);
    const [contrastWarning, setContrastWarning] = useState<string>("");

    const handleSelectColour = (newColour) => {
        dispatch(setColour(newColour));
    };

    const handleClosePanel = () => {
        setOpen(false);
        setContrastWarning("");
    };

    useEffect(() => {
        try {
            const currentBackgroundColor = getColorObject(colour);

            let warning: string = null;
            if (isLowContrast(currentBackgroundColor)) {
                warning = "Laag contrast: slecht leesbaar";
            }
            
            setContrastWarning(warning);
        } catch (error) {
            console.error(error);
        }
    }, [colour]);

    return (
        <div>
            {open ? (
                <>
                    <div style={{ marginLeft: "-15px" }}>
                        <ColourPicker selectedColor={colour} setSelectedColor={handleSelectColour}/>
                    </div>

                    <div style={{ color: "red", height: "20px", marginTop: "-15px" }}>
                        <p id="contrastWarning" >{contrastWarning}</p>
                    </div>

                    <Button style={{ margin: "15px 0px" }} onClick={handleClosePanel}>Selecteer deze kleur</Button>

                    <div style={{ backgroundColor: colour, padding: "10px" }}>
                        <p style={{ color: "#000000" }}>Black text preview</p>
                    </div>
                </>
            ) : (
                <div onClick={() => setOpen(true)}>
                    <ColourSquare colour={colour}/>
                    <div style={{ color: "red" }}>
                        <p>{contrastWarning}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColourPickerComponent;