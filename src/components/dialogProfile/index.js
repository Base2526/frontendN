import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import CommentIcon from "@mui/icons-material/Comment";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";

const index =({open, id, onClose})=> {
    const navigate = useHistory();
  return (
      <Dialog open={open}>
        <DialogTitle>REPORT</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Avatar>H</Avatar>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>CLOSE</Button>
          <IconButton onClick={() => {
                // onPanelComment({ isOpen: true, commentId: 3456 })
                navigate.push("/message")
            }}>
              <CommentIcon />
            </IconButton>
        </DialogActions>
      </Dialog>
  );
}

export default index 