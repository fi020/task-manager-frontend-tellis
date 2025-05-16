import React from "react";
import { Snackbar, Button } from "@mui/material";

type UndoSnackbarProps = {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  onUndo: () => void;
  onClose: () => void;
};

const UndoSnackbar: React.FC<UndoSnackbarProps> = ({
  open,
  message,
  autoHideDuration = 5000,
  onUndo,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      message={message}
      action={
        <Button color="secondary" size="small" onClick={onUndo}>
          UNDO this
        </Button>
      }
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    />
  );
};

export default UndoSnackbar;
