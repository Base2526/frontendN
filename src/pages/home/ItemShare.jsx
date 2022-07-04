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
import ShareIcon from "@mui/icons-material/Share";
import _ from "lodash"

import { gqlShareByPostId } from "../../gqlQuery"

const ItemShare = (props) => {
  let {user, index,  item, onAnchorElShareOpen, onDialogLogin} = props 

  const handleClick = (e) =>{
    _.isEmpty(user)
    ? onDialogLogin(true)
    : onAnchorElShareOpen(index, e);
  }

  let shareValues = useQuery(gqlShareByPostId, {
    variables: {postId: item.id, page: 0, perPage: 1000},
    notifyOnNetworkStatusChange: true,
  });

  if(!shareValues.loading){
    if(shareValues.data.ShareByPostId.data.length == 0){
      return <IconButton onClick={(e) => handleClick(e)}>
                <ShareIcon />
              </IconButton> 
    }

    return  <IconButton onClick={(e) => handleClick(e)}>
              <ShareIcon />
              <div style={{
                  position: "absolute",
                  right: "5px",
                  borderRadius: "5px",
                  borderStyle: "solid",
                  borderColor: "red",
                  borderWidth: "1px",
                  fontSize: "10px"
              }}>{shareValues.data.ShareByPostId.data.length}</div>
            </IconButton>
  }
  
  return  <IconButton onClick={(e) => handleClick(e)}>
            <ShareIcon />
          </IconButton> 

};

export default ItemShare;
