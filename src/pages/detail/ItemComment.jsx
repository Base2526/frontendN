import React, { useState, useEffect, withStyles } from "react";
import { useQuery, useMutation } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';

import _ from "lodash"

import { gqlComment } from "../../gqlQuery"
import { CommentSection } from "../../components/comment";

const ItemComment = (props) => {
    let { user, id, onComment, onDialogLogin } = props 
    
    const signinUrl = "/signin";
    const signupUrl = "/signup";

    let commentValues = useQuery(gqlComment, {
      variables: {postId: id},
      notifyOnNetworkStatusChange: true,
    });

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
