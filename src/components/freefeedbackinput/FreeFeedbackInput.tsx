import { Button, Textarea } from "@fluentui/react-components";
import * as React from "react";
import STRING_RESOURCES from "./Strings";
import { useState } from "react";
import { insertFreeFeedback } from "../../taskpane/office-document";

const FreeFeedbackInput =() => {
    const [text, setText] = useState<string>("");

    const handleTextInsertion = async () => {
        await insertFreeFeedback(text);
    };

    const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };
    return (
        <div>
            <Textarea appearance="outline" onChange={handleTextChange} placeholder={STRING_RESOURCES.freefeedbackinput.textarea.placeholder} />
            <Button onClick={handleTextInsertion}>{STRING_RESOURCES.freefeedbackinput.button.label}</Button>
        </div>

    );
};

export default FreeFeedbackInput;