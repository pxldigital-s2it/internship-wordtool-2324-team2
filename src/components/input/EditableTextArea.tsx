import * as React from "react";
import { Dispatch, SetStateAction } from "react";

const EditableTextArea: React.FC<{placeholder: string, value: string, onChange: Dispatch<SetStateAction<string>>, onEnter: () => void, onEscape: () => void, ref?:React.LegacyRef<HTMLTextAreaElement>}> = ({ placeholder, value, onChange, onEnter, onEscape, ref }) => {
  return (<textarea
    ref={ref}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ fontFamily: "Segoe UI", width: "90%" }}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onEnter();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
      }
    }}
    autoFocus
  />);
};

export default EditableTextArea;
