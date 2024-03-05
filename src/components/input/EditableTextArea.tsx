import * as React from "react";
import { Dispatch, SetStateAction } from "react";

interface EditableTextAreaProps {
  placeholder: string,
  value: string,
  onChange: Dispatch<SetStateAction<string>>,
  onEnter: () => void,
  onEscape: () => void,
  onBlur?: () => void
}

const EditableTextArea= React.forwardRef<HTMLTextAreaElement, EditableTextAreaProps>(({ placeholder, value, onChange, onEnter, onEscape, onBlur }, ref) => {
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
    onBlur={onBlur}
    autoFocus
  />);
});

EditableTextArea.displayName = "EditableTextArea";

export default EditableTextArea;
