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

import _ from "lodash"

import { gqlComment } from "../../gqlQuery"

const ItemComment = (props) => {
    let {item, onPanelComment} = props 
    const iconComment = () =>{
        let commentValues = useQuery(gqlComment, {
          variables: {postId: item.id},
          notifyOnNetworkStatusChange: true,
        });
    
        if(!commentValues.loading){
          if(commentValues.data.comment.data.length == 0){
            return <CommentIcon />
          }
    
          let count = 0;
          _.map(commentValues.data.comment.data, (v) => {
            if (v.replies) {
              count += v.replies.length;
            }
          });
    
          return  <div>
                    <CommentIcon />
                    <div style={{
                      position: "absolute",
                      right: "5px",
                      borderRadius: "5px",
                      borderStyle: "solid",
                      borderColor: "red",
                      borderWidth: "1px",
                      fontSize: "10px"
                    }}>{commentValues.data.comment.data.length + count}</div>
                  </div>
        }
    
        return <CommentIcon />
    }

    return (
        <IconButton onClick={(e) => {
            onPanelComment({ isOpen: true, commentId: item.id })
        }}>
            {iconComment()}
        </IconButton>
        );
};

export default ItemComment;
