import React, { useState, useEffect, withStyles } from "react";
import { CommentSection } from "../../components/comment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import data from "./data.json";

const styles = {
  largeIcon: {
    width: 60,
    height: 60
  }
};

const useStyles = makeStyles((theme) => ({
  deleteIcon1: {
    "& svg": {
      fontSize: 25
    }
  },
  deleteIcon2: {
    "& svg": {
      fontSize: 50
    }
  },
  deleteIcon3: {
    "& svg": {
      fontSize: 75
    }
  },
  deleteIcon4: {
    "& svg": {
      fontSize: 100
    }
  }
}));

const PanelComment = ({ commentId, isOpen, onRequestClose }) => {
  const classes = useStyles();

  const [comment, setComment] = useState(data);
  const userId = "01a";
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random";
  const name = "xyz";
  const signinUrl = "/signin";
  const signupUrl = "/signup";
  let count = 0;

  comment.map((i) => {
    count += 1;
    i.replies && i.replies.map((i) => (count += 1));
  });

  useEffect(() => {
    console.log("comment :", comment, commentId);
  }, [comment]);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      // onClose={onRequestClose}
      // onOpen={onRequestClose}
      ModalProps={{ onBackdropClick: onRequestClose }}
    >
      <Box
        sx={{
          width: 400
        }}
        role="presentation"
        // onClick={onRequestClose}
        // onKeyDown={onRequestClose}
      >
        <IconButton
          aria-label="toggle password visibility"
          onClick={onRequestClose}
        >
          <CancelRoundedIcon />
        </IconButton>
        <div className="commentSection">
          <div className="header">{count} Comments</div>
          <CommentSection
            currentUser={
              userId && { userId: userId, avatarUrl: avatarUrl, name: name }
            }
            commentsArray={comment}
            setComment={(data) => {
              console.log("onComment data :", data);
              setComment(data);
            }}
            signinUrl={signinUrl}
            signupUrl={signupUrl}
          />
        </div>
      </Box>
    </SwipeableDrawer>
  );
};

export default PanelComment;
