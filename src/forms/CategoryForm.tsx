import * as React from "react";
import { ReactElement, useRef, useState } from "react";
import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  Table, TableBody
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectTitle, setOpen } from "../redux/modal/modal.slice";
import { formatData, getFormField, readFormField, renderRow } from "./utils/FormUtils";
import { DisplayableSubCategory } from "../types/SubCategory";
import useCategory from "../hooks/useCategory";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px"
  }
});

const CategoryForm = (): Nullable<ReactElement> => {

  const [disabled, setDisabled] = useState(true);

  const styles = useStyles();

  const dispatch = useAppDispatch();

  const title = useAppSelector(selectTitle);
  const formRef = useRef<HTMLFormElement>(null);
  const { categoryTitle, data, handleSubmit } = useCategory();

  const validate = () => {
    let disabled = false;
    Object.keys(data).forEach(key => {
      if (getFormField(formRef, key) && !readFormField(formRef, key)) {
        disabled = true;
      }
    });

    setDisabled(disabled);
  };
  const handleClose = () => dispatch(setOpen(false));

  if (!data) {
    return null;
  }

  return (
    <form ref={formRef} onChange={validate}>
      <DialogBody>
        <DialogTitle action={null}
                     style={{ textDecoration: "underline" }}>{ title }</DialogTitle>
        <DialogContent className={styles.content}>
          <Table>
            <TableBody>
              {formatData(data, categoryTitle).map((data: DisplayableSubCategory) => renderRow(data))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" onClick={handleClose}>Sluiten</Button>
          </DialogTrigger>
          <Button appearance="primary" onClick={() => handleSubmit(formRef)} disabled={disabled}>
            Bevestigen
          </Button>
        </DialogActions>
      </DialogBody>
    </form>
  );
};

export default CategoryForm;
