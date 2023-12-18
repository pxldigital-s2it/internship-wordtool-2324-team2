import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
import insertText from "../office-document";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "10px",
    marginTop: "20px"
  },
  textAreaField: {
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "30px",
    maxWidth: "50%"
  },
  textPromptAndInsertion: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  }
});

const TextInsertion: React.FC = () => {
  const [text, setText] = useState<string>("Some text.");

  const handleTextInsertion = async () => {
    
    await insertText(text);
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button>
    </div>
  );
};

export default TextInsertion;
