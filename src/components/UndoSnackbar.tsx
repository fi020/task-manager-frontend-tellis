import React, { useEffect, useState } from "react";
import { Snackbar, Button, SnackbarContent, LinearProgress } from "@mui/material";

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

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!open) return;

    let start: number = Date.now();
    const end = start + autoHideDuration;
    const interval = 100;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(end - now, 0);
      setProgress((remaining / autoHideDuration) * 100);
      if (remaining <= 0) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [open, autoHideDuration]);


  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      transitionDuration={300}
      onClose={(_e, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      style={{
        bottom: 16 + offset,
        left: 16,
        position: "fixed",
      }}
    >
      <div>
        <SnackbarContent
          style={{
            backgroundColor: "#ffeb3b", // Yellow
            color: "#000",
            paddingBottom: 0,
          }}
          // message={<span>{message}</span>}
          message={
            (() => {
              const status = message.includes('incomplete') ? 'incomplete' : 'complete';
              const color = status === 'incomplete' ? '#e53935' : '#43a047';
          
              // Extract task title (before " will be marked")
              const titleEnd = message.indexOf(' will be marked');
              const title = message.slice(0, titleEnd);
              const [before, after] = message.slice(titleEnd).split(status);
          
              return (
                <span>
                  <strong style={{ fontWeight: 600 }}>{title}</strong>
                  {before}
                  <strong style={{ color }}>{status}</strong>
                  {after}
                </span>
              );
            })()
          }
          
          action={
            <Button color="secondary" size="small" onClick={onUndo}>
              UNDO
            </Button>
          }
        />
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ height: 4, backgroundColor: "#fff176" }}
        />
      </div>
    </Snackbar>

  );
};

export default UndoSnackbar;
