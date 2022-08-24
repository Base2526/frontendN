import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation } from "@apollo/client";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import _ from "lodash"
import { connect } from "react-redux";

import { gqlIsBookmark, gqlCreateAndUpdateBookmark, subBookmark } from "../../gqlQuery"

let unsubscribe =null
const ItemBookmark = (props) => {
  let {user, item, onDialogLogin, onBookmark} = props 

  
  let bmValus = useQuery(gqlIsBookmark, {
    variables: {userId: "", postId: ""},
    notifyOnNetworkStatusChange: true,
  });

  useEffect(()=>{
    if(!_.isEmpty(user)){
      bmValus.refetch({userId: user.id, postId: item.id});
    }else{
      bmValus.refetch({userId: "", postId: item.id});
    }
  }, [user])

  
  if(!bmValus.loading){


    if(!_.isEmpty(bmValus.data)){

      let {subscribeToMore} = bmValus
      unsubscribe =  subscribeToMore({
        document: subBookmark,
        variables: { userId: user.id, postId: item.id },
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) return prev;
  
          let { mutation, data } = subscriptionData.data.subBookmark;
  
          let newPrev = {...prev.isBookmark, data}
  
          return {isBookmark: newPrev};
        }
      });
      
      let isBookmark = bmValus.data.isBookmark.data
      if(isBookmark == null){
        return  <IconButton onClick={(e) =>{
                  _.isEmpty(user) ?  onDialogLogin(true) :  onBookmark( item.id, user.id, true )
                }}>
                  <BookmarkIcon style={{ color:"" }} /> 
                </IconButton>
      }
  
      let color = isBookmark.status == null ? "" : isBookmark.status ? "blue" : ""
  
      return  <IconButton onClick={(e) =>{
                _.isEmpty(user) ?  onDialogLogin(true) : onBookmark( item.id, user.id, !isBookmark.status)
              }}>
                <BookmarkIcon style={{ color }} /> 
              </IconButton>
    }       
  }
  return  <IconButton onClick={(e) =>{
              _.isEmpty(user) ?  onDialogLogin(true) : onBookmark( item.id, user.id,true)
            }}> 
            <BookmarkIcon style={{ color:"" }} />
          </IconButton>

};

// export default ItemBookmark;

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
};

export default connect( mapStateToProps, null )(ItemBookmark);
