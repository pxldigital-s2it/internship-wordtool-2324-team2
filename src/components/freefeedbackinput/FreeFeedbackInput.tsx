import { Textarea } from "@fluentui/react-components";
import * as React from "react";
import STRING_RESOURCES from "./Strings";
import { useState } from "react";
import { insertAndHighlightText, insertFreeFeedback } from "../../taskpane/office-document";
import { PrimaryButton } from "@fluentui/react/lib/Button";

export interface FreeFeedbackInputProps {
    categoryId ?: string,
    description ?: string
}

const FreeFeedbackInput: React.FC<FreeFeedbackInputProps> = ({ categoryId, description }) => {
    const [text, setText] = useState<string>("");

    const handleTextInsertion = async () => {
        if (categoryId && description) {
            await insertFreeFeedback(text);
            await insertAndHighlightText(categoryId, description)
        } else {
            await insertFreeFeedback(text);
        }
    };

    const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div>
            <table
                style={{
                    height: "100%",
                    width: "100%"
                }}>
                <tbody>
                    <tr
                        style={{
                            height: "100%"
                        }}>
                        <td
                        style={{
                            width: "70%"
                        }}>
                            <Textarea
                                style={{ width: "100%" }} appearance="outline"
                                value={text}
                                onChange={handleTextChange}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();

                                        // submit logic
                                        await handleTextInsertion();
                                        setText("");
                                    } else if (e.key === "Escape") {
                                        e.preventDefault();

                                        // cancel logic
                                        setText("");
                                    }
                                    // shift enter for a new line is handled by default
                                }}
                                placeholder={STRING_RESOURCES.freefeedbackinput.textarea.placeholder} />
                        </td>
                        <td
                            style={{
                                width: "30%"
                            }}>
                            <PrimaryButton
                                iconProps={{ iconName: 'Comment' }}
                                onClick={handleTextInsertion}
                                style={{
                                    height: "100%",
                                    width: "100%"
                                }}
                                title={ STRING_RESOURCES.freefeedbackinput.button.title }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default FreeFeedbackInput;