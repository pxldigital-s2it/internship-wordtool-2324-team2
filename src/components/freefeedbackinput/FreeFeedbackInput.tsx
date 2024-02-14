import { Textarea } from "@fluentui/react-components";
import * as React from "react";
import STRING_RESOURCES from "./Strings";
import { useState } from "react";
import { insertFreeFeedback } from "../../taskpane/office-document";
import {PrimaryButton} from "@fluentui/react/lib/Button";

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
            <table
                style={{
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
                            <Textarea style={{ width: "100%" }} appearance="outline" onChange={handleTextChange} placeholder={STRING_RESOURCES.freefeedbackinput.textarea.placeholder} />
                        </td>
                        <td
                            style={{
                                width: "30%"
                            }}>
                            <PrimaryButton
                                iconProps={{ iconName: 'Comment' }}
                                onClick={handleTextInsertion}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    padding: "18px"
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default FreeFeedbackInput;