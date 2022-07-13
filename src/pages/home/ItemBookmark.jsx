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
  let {user, item, onDialogLogin} = props 

  if(_.isEmpty(user)){
    return  <IconButton onClick={e=>onDialogLogin(true)}> <BookmarkIcon style={{ color:"" }} /> </IconButton>
  }

  const [onCreateAndUpdateBookmark, resultCreateAndUpdateBookmarkValues] = useMutation(gqlCreateAndUpdateBookmark
    , {
        update: (cache, {data: {createAndUpdateBookmark}}) => {
            const data1 = cache.readQuery({
                query: gqlIsBookmark,
                variables: {
                  userId: user.id, postId: item.id
                }
            });

            let newData = {...data1.isBookmark}
            newData = {...newData, data: createAndUpdateBookmark}
        
            cache.writeQuery({
                query: gqlIsBookmark,
                data: {
                  isBookmark: newData
                },
                variables: {
                  userId: user.id, postId: item.id
                }
            });        
        },
        onCompleted({ data }) {
        //   console.log("bookmark :::: onCompleted")
        },
      },  
  );

  let bmValus = useQuery(gqlIsBookmark, {
    variables: {userId: user.id, postId: item.id},
    notifyOnNetworkStatusChange: true,
  });
  
  if(!bmValus.loading){

    let isBookmark = bmValus.data.isBookmark.data
    if(isBookmark == null){
      return  <IconButton onClick={(e) => {
                  onCreateAndUpdateBookmark({ variables: { input: {
                        postId: item.id,
                        userId: user.id,
                        status: true
                      }
                    }
                  }); 
                }}>
                <BookmarkIcon style={{ color:"" }} /> 
              </IconButton>
    }

    let color = isBookmark.status == null ? "" : isBookmark.status ? "blue" : ""

    return  <IconButton onClick={(e) => {
                onCreateAndUpdateBookmark({ variables: { input: {
                      postId: item.id,
                      userId: user.id,
                      status: !isBookmark.status
                    }
                  }
                })
              }}>
              <BookmarkIcon style={{ color }} /> 
            </IconButton>
  }
  return  <IconButton onClick={(e) => {
                        onCreateAndUpdateBookmark({ variables: { input: {
                              postId: item.id,
                              userId: user.id,
                              status: true
                            }
                          }
                        }); 
                      }}> 
            <BookmarkIcon style={{ color:"" }} />
          </IconButton>

};

export default ItemBookmark;
