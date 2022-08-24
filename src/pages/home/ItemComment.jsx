import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "@apollo/client";
import CommentIcon from "@mui/icons-material/Comment";
import _ from "lodash"

import { gqlComment, subComment } from "../../gqlQuery"

let unsubscribe  = null
const ItemComment = (props) => {
    let {item, onPanelComment} = props 

    useEffect(()=>{
      return () => {
        unsubscribe && unsubscribe()
      };
    }, [])

    const iconComment = () =>{
        let commentValues = useQuery(gqlComment, {
          variables: {postId: item.id},
          notifyOnNetworkStatusChange: true,
        });
    
        if(!commentValues.loading){
          
          let {subscribeToMore} = commentValues
          unsubscribe =  subscribeToMore({
            document: subComment,
            variables: { commentID: item.id },
            updateQuery: (prev, {subscriptionData}) => {
              console.log("ItemComment updateQuery #1 >> ", prev, subscriptionData);
              if (!subscriptionData.data) return prev;

              let { mutation, data } = subscriptionData.data.subComment;

              let newPrev = {...prev.comment, data}

              console.log("ItemComment updateQuery #2 >> ", prev, subscriptionData, newPrev);
        
              return {comment: newPrev}; 
            }
          });

          if( _.isEmpty(commentValues.data) || commentValues.data.comment.data.length == 0){
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
