import React from "react";
import { Snackbar, Button } from "@mui/material";

type UndoSnackbarProps = {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  onUndo: () => void;
  onClose: () => void;
  offset?: number;
};

const UndoSnackbar: React.FC<UndoSnackbarProps> = ({
  open,
  message,
  autoHideDuration = 5000,
  onUndo,
  onClose,
  offset = 0,
}) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      transitionDuration={300}
      onClose={(e, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      style={{
        bottom: 16 + offset,
        left: 16,
        position: "fixed", // Needed because disabling portal removes fixed behavior
      }}
      // disablePortal // Important: makes the Snackbar render in-place so style works
      action={
        <Button color="secondary" size="small" onClick={onUndo}>
          UNDO
        </Button>
      }
    />
  );
};

export default UndoSnackbar;
