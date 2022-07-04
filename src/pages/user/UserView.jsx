import React, { useState, useEffect, withStyles } from "react";
import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton,
  ButtonWrapper
} from "./User.styled";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams, Link } from "react-router-dom";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import {  gqlUsers, 
          gqlUser, 
          gqlRoles, 
          gqlConversations, 
          gqlCreateConversation,

          gqlCreateAndUpdateFollow, 
          gqlIsFollow } from "../../gqlQuery"

import UserPostList from "./UserPostList"
import { isAuth } from "../../AuthProvider"
import DialogLogin from "../../DialogLogin";

import { login } from "../../redux/actions/auth"

const UserView = (props) => {
  let history = useHistory();
  const { pathname } = useLocation();

  const [dialogLoginOpen, setDialogLoginOpen] = useState(false);

  let userId= "62a2f65dcf7946010d3c7547";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  let { id } = useParams();

  let isFollowValues = useQuery(gqlIsFollow, {
    variables: {userId: userId, friendId: id},
    notifyOnNetworkStatusChange: true,
  });

  let userValues = useQuery(gqlUser, {
    variables: {id},
    notifyOnNetworkStatusChange: true,
  });
  
  const [onCreateConversation, resultCreateConversation] = useMutation(gqlCreateConversation
    , {
        update: (cache, {data: {createConversation}}) => {
          // Update the cache as an approximation of server-side mutation effects
          // console.log("update > createConversation", createConversation)

          const data = cache.readQuery({
            query: gqlConversations,
            variables: {
              userId: userId
            }
          });

          if(data != null){
            if(_.find(data.conversations.data, (v)=>v.id === createConversation.id) == null){
              let new_data = {...data.conversations}
          
              new_data = [...new_data.data, createConversation]
              let new_conversations = {...data.conversations, data: new_data}
  
              cache.writeQuery({
                query: gqlConversations,
                data: {
                  conversations: new_conversations
                },
                variables: {
                  userId: userId
                }
              });
            }

          }
        },
        onCompleted({ data }) {
          // history.push("/");
          // console.log("onCompleted > onCreateConversation")

          history.push("/message")
        },
      },  
  );

  const [onCreateAndUpdateFollow, resultCreateAndUpdateFollow] = useMutation(gqlCreateAndUpdateFollow
    , {
        update: (cache, {data: {createAndUpdateFollow}}) => {
          // Update the cache as an approximation of server-side mutation effects
          // console.log("update > onCreateAndUpdateFollow", createAndUpdateFollow)

          const data = cache.readQuery({
            query: gqlIsFollow,
            variables: {
              userId: userId, friendId: id
            }
          });

          let newData = {...data.isFollow}
          newData = {...newData, data: createAndUpdateFollow}
        
          cache.writeQuery({
            query: gqlIsFollow,
            data: {
              isFollow: newData
            },
            variables: {
              userId: userId, friendId: id
            }
          });
        },
        onCompleted({ data }) {
          // console.log("onCompleted > onCreateAndUpdateFollow")
        },
      },  
  );

  const isFollow = () =>{
    if(!isFollowValues.loading){
      if(isFollowValues.data.isFollow.data != null && isFollowValues.data.isFollow.data.status){
        return true
      }
    }
    return false
  }
  
  const mainView = () =>{
    let user = userValues.data.User.data
    let imageSrc =  _.isEmpty(user.image) ? "" : user.image[0].base64

    return  <div>
              <Typography variant="overline" display="block" gutterBottom>
                Profile
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar
                  className={"user-profile"}
                  sx={{
                    height: 80,
                    width: 80
                  }}
                  variant="rounded"
                  alt="Example Alt"
                  src={imageSrc}
                />
              </Stack>
              <Typography variant="overline" display="block" gutterBottom>
                Name : {user.displayName}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                Email : {user.email}
              </Typography>

              <div>
              <Button
                variant="contained" 
                color="primary">Follower(0)</Button>
              </div>
              <div>
              <Button
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                  // isAuth()
                  !_.isEmpty(props.user)
                  ? onCreateAndUpdateFollow({ variables: { input: {
                          userId: userId,
                          friendId: id,
                          status: !isFollow()
                        }
                      }
                    })
                  : setDialogLoginOpen(true)
                }}>

                {isFollow() ? "Following" : "Follow"}
                
              </Button>
              </div>
              <div>
              <Button 
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                  // isAuth()
                  !_.isEmpty(props.user)
                  ? onCreateConversation({ variables: { input: {
                          userId: userId,
                          friendId: id
                        }
                      }
                    })
                  : setDialogLoginOpen(true)
                }}>
                Chat
              </Button>
              </div>
              <>
                <UserPostList id={id}/>                  
              </>
            </div>

  }

  return (
    <div>
      {
        userValues != null && userValues.loading
        ? <div><CircularProgress /></div> 
        : mainView()
      }

      {dialogLoginOpen && (
        <DialogLogin
          open={dialogLoginOpen}
          onComplete={(data)=>{
            console.log("onComplete :", data)

            props.login(data)
            setDialogLoginOpen(false);
          }}
          onClose={() => {
            setDialogLoginOpen(false);
          }}
        />
      )}
    </div>
  );
};

// export default UserView;

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = {
  login
}

export default connect( mapStateToProps, mapDispatchToProps )(UserView);
