import {Button, Textarea} from "@fluentui/react-components";
import * as React from "react";
import STRING_RESOURCES from "../buttons/Strings";

const FreeFeedbackInput =() => {
    return (
        <div>
            <Textarea appearance="outline" required />
            <Button>{STRING_RESOURCES.buttons.input.label}</Button>
        </div>

    );
};

export default FreeFeedbackInput;