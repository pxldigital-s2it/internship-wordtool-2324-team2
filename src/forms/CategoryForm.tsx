import * as React from "react";
import { ReactElement, useEffect, useRef, useState } from "react";
import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  Table,
  TableBody
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectTitle } from "../redux/modal/modal.slice";
import { formatData, getFormField, readFormField, renderRow } from "./utils/FormUtils";
import useCategory from "../hooks/useCategory";
import { DisplayableCategory } from "./utils/FormUtils.types";
import { closeModal } from "../middleware/modal/ModalMiddleware";
import { selectConfirmBeingHandled } from "../redux/contrastwarningalert/contrastwarningalert.slice";
import { closeContrastWarningAlert } from "../middleware/contrastwarningalert/ContrastWarningAlertMiddleware";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px"
  }
});

const CategoryForm = (): Nullable<ReactElement> => {
  const dispatch = useAppDispatch();
  const alertConfirmBeingHandled = useAppSelector(selectConfirmBeingHandled);
  
  const [disabled, setDisabled] = useState(true);

  const styles = useStyles();

  const title = useAppSelector(selectTitle);
  const formRef = useRef<HTMLFormElement>(null);
  const { categoryTitle, data, handleSubmit, saveData } = useCategory();

  const validate = () => {
    let disabled = false;
    if (data) {
      Object.keys(data).forEach(key => {
        if ((getFormField(formRef, key) && !readFormField(formRef, key))) {
          disabled = true;
        }
      });
    }

    setDisabled(disabled);
  };

  useEffect(() => {
    validate();
  }, []);
  
  useEffect(() => {
    if (alertConfirmBeingHandled) {
      saveData(formRef).then(() => {
        dispatch(closeContrastWarningAlert());
      });
    }
  }, [alertConfirmBeingHandled]);

  // TODO: Close should reset form
  const handleClose = () => dispatch(closeModal());

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
              {formatData(data, categoryTitle).map((data: DisplayableCategory) => renderRow(data))}
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
