import React, { useState, useEffect } from "react";
import ColourPicker from "./ColourPicker";
import ColourSquare from "./ColourSquare";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectColour, setColour } from "../../redux/category/category.slice";
import { isLowContrast } from "../../utils/ContrastUtils";
import { getColorObject } from "../../utils/ColorUtils";

const ColourPickerComponent = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const tempColour = useAppSelector(selectColour);
    const colour = tempColour ? tempColour : "#ffffff";

    const [contrastWarning, setContrastWarning] = useState<string>("");

    const handleSelectColour = (newColour) => {
        dispatch(setColour(newColour));
    };

    const handleClosePanel = () => {
        setOpen(false);
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
                    <div style={{ textAlign: "right" }}>
                        <div id="closeButton" onClick={handleClosePanel} style={{ cursor: "pointer" }}>x</div>
                    </div>
                    <div style={{ marginLeft: "-15px" }}>
                        <ColourPicker selectedColor={colour} setSelectedColor={handleSelectColour}/>
                    </div>

                    <div style={{ color: "red", height: "20px", marginBottom: "15px", marginTop: "-15px" }}>
                        <p id="contrastWarning">{contrastWarning}</p>
                    </div>

                    <div style={{ backgroundColor: colour, padding: "10px" }}>
                        <p style={{ color: "#000000" }}>Preview (zwart)</p>
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