import React, { useState, useEffect, withStyles } from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const PopupSnackbar = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    // console.log("useEffect panelComment");
  }, []);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1000}
      onClose={onClose}
      message={message}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={onClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default PopupSnackbar;
