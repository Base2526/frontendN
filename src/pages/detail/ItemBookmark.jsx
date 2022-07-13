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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import _ from "lodash"

import { gqlIsBookmark, gqlCreateAndUpdateBookmark } from "../../gqlQuery"

const ItemBookmark = (props) => {
    let {user, postId, onBookmark, onDialogLogin} = props 

    const handleCreateBookmark = (status) =>{
      if( _.isEmpty(user) ){
        onDialogLogin(true)
      }else{
        onBookmark({ postId: postId, userId: user.id, status })
      }
    }

    if(_.isEmpty(user)){
        return  <IconButton onClick={(e) => { onDialogLogin(true) }}>
                    <BookmarkIcon style={{ color:"" }} /> 
                </IconButton>
    }
    const bmValus = useQuery(gqlIsBookmark, {
        variables: {userId: user.id, postId: postId},
        notifyOnNetworkStatusChange: true,
    });
    
    if(!bmValus.loading){
        if(bmValus.data.isBookmark.data === null){
            return  <IconButton onClick={(e) => {
                        handleCreateBookmark(true)
                    }}>
                    <BookmarkIcon style={{ color:"" }} /> 
                    </IconButton>
        }
    
        let color = bmValus.data.isBookmark.data.status === null ? "" : bmValus.data.isBookmark.data.status ? "blue" : ""
    
        return  <IconButton onClick={(e) => {
                        handleCreateBookmark(!bmValus.data.isBookmark.data.status)
                    }}>
                    <BookmarkIcon style={{ color }} /> 
                </IconButton>
                
        
    }
    return  <IconButton onClick={(e) => {
                handleCreateBookmark(true)
            }}>
            <BookmarkIcon style={{ color:"" }} /> 
            </IconButton>

};

export default ItemBookmark;
