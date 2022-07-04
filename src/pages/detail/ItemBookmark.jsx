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

import { gqlIsBookmark, gqlCreateBookmark } from "../../gqlQuery"

const ItemBookmark = (props) => {
    let {user, postId, onDialogLoginOpen} = props 

    const [onCreateBookmark, resultCreateBookmarkValues] = useMutation(gqlCreateBookmark
        , {
            update: (cache, {data: {createBookmark}}) => {
              const data1 = cache.readQuery({
                query: gqlIsBookmark,
                variables: {
                  userId: user.id,
                  postId: postId
                }
              });
    
              let newData = {...data1.isBookmark}
              newData = {...newData, data: createBookmark}
            
              cache.writeQuery({
                query: gqlIsBookmark,
                data: {
                  isBookmark: newData
                },
                variables: {
                  userId: user.id,
                  postId: postId
                }
              });
            },
            onCompleted({ data }) {
              // console.log("bookmark :::: onCompleted")
            },
          },  
    );
    console.log("resultCreateBookmarkValues :", resultCreateBookmarkValues)

    const handleCreateBookmark = (status) =>{
        if( _.isEmpty(user) ){
          onDialogLoginOpen(true)
        }else{
          onCreateBookmark({ variables: { input: {
                                        postId: postId,
                                        userId: user.id,
                                        status
                                      }
                                    }
                                  }); 
        }
      }

    if(_.isEmpty(user)){
        return  <IconButton onClick={(e) => { onDialogLoginOpen(true) }}>
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
