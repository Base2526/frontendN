import React, { useState, useEffect, withStyles } from "react";
import { CommentSection } from "../../components/comment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, useMutation } from "@apollo/client";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import {gqlComment, gqlCreateComment} from "../../gqlQuery"

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

  const [comment, setComment] = useState([]);
  const userId = "01a";
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random";
  const name = "xyz";
  const signinUrl = "/signin";
  const signupUrl = "/signup";
  let count = 0;

  // comment.map((i) => {
  //   count += 1;
  //   i.replies && i.replies.map((i) => (count += 1));
  // });

  const [onCreateComment, resultCreateComment] = useMutation(gqlCreateComment, 
    {
        update: (cache, {data: {createComment}}) => {
            const data1 = cache.readQuery({
                query: gqlComment,
                variables: {postId: commentId}
            });

            let newData = {...data1.Comment}
            newData = {...newData, data: createComment.data}
                
            cache.writeQuery({
                query: gqlComment,
                data: {
                    Comment: newData
                },
                variables: {
                    postId: commentId
                }
            });
        },
        onCompleted({ data }) {
            console.log("onCompleted")
        }
    }
  );
  console.log("resultCreateComment :", resultCreateComment)

  let commentValues = useQuery(gqlComment, {
    variables: {postId: commentId},
    notifyOnNetworkStatusChange: true,
  });
  console.log("commentValues : ", commentValues)

  // if(!commentValues.loading){
  //   setComment(commentValues.data.Comment.data)
  // }

  /* loading
  commentValues.data.Comment.data
  */

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
          
          {
            commentValues.loading 
            ? <div><CircularProgress /></div> 
            : <div>
                <CommentSection
                  currentUser={
                    userId && { userId: userId, avatarUrl: avatarUrl, name: name }
                  }
                  commentsArray={commentValues.data.Comment.data}
                  setComment={(data) => {

                    let input = { postId: commentId, data: _.omitDeep(data, ['__typename']) }
                    console.log("onComment input :", input);

                    onCreateComment({ variables: { input: input }});

                  }}
                  signinUrl={signinUrl}
                  signupUrl={signupUrl}
                />
              </div>  
          }
          </div>
      </Box>
    </SwipeableDrawer>
  );
};

export default PanelComment;
