import React, { useState, useEffect, withStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@apollo/client";
import CommentIcon from "@mui/icons-material/Comment";
import CircularProgress from '@mui/material/CircularProgress';

import _ from "lodash"

import { gqlComment, gqlCreateComment } from "../../gqlQuery"
import { CommentSection } from "../../components/comment";

const ItemComment = (props) => {
    let { user, id, onDialogLoginOpen } = props 

    console.log("ItemComment :", user)
    
    const signinUrl = "/signin";
    const signupUrl = "/signup";

    let commentValues = useQuery(gqlComment, {
      variables: {postId: id},
      notifyOnNetworkStatusChange: true,
    });

    const [onCreateComment, resultCreateComment] = useMutation(gqlCreateComment, 
      {
          update: (cache, {data: {createComment}}) => {
              const data1 = cache.readQuery({
                  query: gqlComment,
                  variables: {postId: id}
              });
  
              let newData = {...data1.Comment}
              newData = {...newData, data: createComment.data}
                  
              cache.writeQuery({
                  query: gqlComment,
                  data: {
                      Comment: newData
                  },
                  variables: {
                      postId: id
                  }
              });
          },
          onCompleted({ data }) {
              // console.log("onCompleted")
          }
      }
  );

  /*
    const userId =  user == null ? "" : user.id;
  const avatarUrl = user == null ? "" : _.isEmpty(user.image) ? "" : user.image[0].base64 ;
  const name = user == null ? "" : user.displayName;
  */

    return (
      <>
      {
        commentValues.loading 
        ?  <div><CircularProgress /></div> 
        :  <CommentSection
            currentUser={
                _.isEmpty(user)  
                ? null
                : { userId: user == null ? "" : user.id, 
                    avatarUrl: user == null ? "" : _.isEmpty(user.image) ? "" : user.image[0].base64, 
                    name: user == null ? "" : user.displayName }
            }
            commentsArray={commentValues.data.comment.data}
            setComment={(data) => {
                let input = { postId: id, data: _.omitDeep(data, ['__typename']) }
                onCreateComment({ variables: { input: input }});
            }}
            signinUrl={signinUrl}
            signupUrl={signupUrl}
            onSignin={(e)=>{
                onDialogLoginOpen(true)
            }}/>
      }
      </>
    )
};

export default ItemComment;
