import React, { useState, useEffect, withStyles } from "react";
import { useQuery, useMutation } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';

import _ from "lodash"

import { gqlComment, subComment } from "../../gqlQuery"
import { CommentSection } from "../../components/comment";

let unsubscribe =null
const ItemComment = (props) => {
    let { user, id, onComment, onDialogLogin } = props 
    
    const signinUrl = "/signin";
    const signupUrl = "/signup";

    let commentValues = useQuery(gqlComment, {
      variables: {postId: id},
      notifyOnNetworkStatusChange: true,
    });

    if(!commentValues.loading){
      let {subscribeToMore} = commentValues
      unsubscribe =  subscribeToMore({
        document: subComment,
        variables: { commentID: id },
        updateQuery: (prev, {subscriptionData}) => {
          console.log("ItemComment updateQuery #1 >> ", prev, subscriptionData);
          if (!subscriptionData.data) return prev;

          let { mutation, data } = subscriptionData.data.subComment;

          let newPrev = {...prev.comment, data}

          console.log("ItemComment updateQuery #2 >> ", prev, subscriptionData, newPrev);
    
          return {comment: newPrev}; 
        }
      });
    }

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

                onComment(input)
            }}
            signinUrl={signinUrl}
            signupUrl={signupUrl}
            onSignin={(e)=>{
                onDialogLogin(true)
            }}/>
      }
      </>
    )
};

export default ItemComment;
