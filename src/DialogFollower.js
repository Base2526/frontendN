import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';

import _ from "lodash"

import { login } from "./redux/actions/auth"
import { gqlFollower } from "./gqlQuery"

const DialogFollower = (props) => {
  let history = useHistory();
  let { user, open, id, onClose, onFollow } = props

  console.log("DialogFollower")

  let followerValues = useQuery(gqlFollower, {
    variables: {userId: id},
    notifyOnNetworkStatusChange: true,
  });

  const onSrc = (follower) =>{
    if(_.isEmpty(follower.image)){
      return ""
    }else{
      return follower.image[0].base64
    }
  }

  return (
    <Dialog 
      fullWidth
      maxWidth="sm"
      onClose={(e)=>{
        onClose(false)
      }} 
      open={open}>
      <DialogTitle>Follower ({followerValues.loading ? 0 : followerValues.data.follower.data.length})</DialogTitle>
      <DialogContent>
        {
          followerValues.loading
          ? <CircularProgress />
          : <List sx={{ width: '100%', bgcolor: 'background.paper'  }} disablePadding>
              {
              followerValues.data.follower.data.map((follower, key) => {
                return  <ListItem 
                          key={key}
                          alignItems="flex-start" 
                          disablePadding
                          secondaryAction={
                            <Button
                              variant="contained" 
                              color="primary"
                              onClick={onFollow}>Follow</Button>
                          }
                          >
                          <ListItemButton 
                          onClick={e=>{
                            console.log("ListItem")
                          }}>
                            <ListItemAvatar>
                              <Avatar alt={follower.displayName} src={onSrc(follower)} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={follower.displayName}
                              // secondary={
                              //   <React.Fragment>
                              //     <Typography
                              //       sx={{ display: 'inline' }}
                              //       component="span"
                              //       variant="body2"
                              //       color="text.primary"
                              //     >
                              //       Ali Connors
                              //     </Typography>
                              //     {" — I'll be in your neighborhood doing errands this…"}
                              //   </React.Fragment>
                              // }
                            />
                          </ListItemButton>
                        </ListItem>
              })
              }
            </List>
        }
        
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  }
};
const mapDispatchToProps = {
  login
}
export default connect( mapStateToProps, mapDispatchToProps )(DialogFollower);