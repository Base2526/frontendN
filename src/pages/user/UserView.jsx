import React, { useState, useEffect, withStyles } from "react";
import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams, Link } from "react-router-dom";

import { Avatar } from "@chatscope/chat-ui-kit-react";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import CircularProgress from '@mui/material/CircularProgress';
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import {  gqlUser, 
          gqlConversations, 
          gqlCreateConversation,
          gqlCreateAndUpdateFollow,
          gqlIsFollow,
          gqlFollower} from "../../gqlQuery"

import UserPostList from "./UserPostList"
import DialogLogin from "../../DialogLogin";
import { login } from "../../redux/actions/auth"
import DialogFollower from "../../DialogFollower"
import ItemFollower from "./ItemFollower"
import ItemFollowing from "./ItemFollowing"

import ReportDialog from "../../components/report"

const UserView = (props) => {
  let history = useHistory();
  let { pathname } = useLocation();
  let { id } = useParams();
  let { user } = props

  const [dialogLoginOpen, setDialogLoginOpen] = useState(false);
  const [dialogFollower, setDialogFollower] = useState(false);

  const [report, setReport] = useState({open: false, postId:""});
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
              userId: user.id
            }
          });

          if(data != null){
            if(_.find(data.conversations.data, (v)=>v._id === createConversation._id) == null){
              let new_data = {...data.conversations}
          
              new_data = [...new_data.data, createConversation]
              let new_conversations = {...data.conversations, data: new_data}
  
              cache.writeQuery({
                query: gqlConversations,
                data: {
                  conversations: new_conversations
                },
                variables: {
                  userId: user.id
                }
              });
            }

          }
        },
        onCompleted({createConversation}) {
          history.push({pathname: "/message", state: { conversationId: createConversation._id }})
        },
      },  
  );

  console.log("resultCreateConversation :", resultCreateConversation)

  const [onCreateAndUpdateFollow, resultCreateAndUpdateFollow] = useMutation(gqlCreateAndUpdateFollow
    , {
        update: (cache, {data: {createAndUpdateFollow}}) => {
          const data = cache.readQuery({
            query: gqlIsFollow,
            variables: {
              userId: user.id, friendId: id
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
              userId: user.id, friendId: id
            }
          });

        
          //////////// update follower /////////////////
          let followerValues = cache.readQuery({
              query: gqlFollower,
              variables: {
                userId: id
              }
          });

          let newFollowerData  = followerValues.follower.data
          newFollowerData = _.filter(newFollowerData, (f)=>f._id != user.id)
          if(createAndUpdateFollow.status){
            newFollowerData = [...newFollowerData, user]
          }

          let newFollower  = followerValues.follower
          newFollower = {...newFollower, data: newFollowerData}
          
          cache.writeQuery({
            query: gqlFollower,
            data: {
              follower: newFollower
            },
            variables: {
              userId: id
            }
          });
        },
        onCompleted({ data }) {
          // console.log("onCompleted > onCreateAndUpdateFollow")
        },
      },  
  );

  const onButtonChat = () =>{

    if(!(!_.isEmpty(user) && user.id === id)){
      return  <Button 
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                  !_.isEmpty(props.user)
                  ? onCreateConversation({ variables: { input: {
                          userId: user.id,
                          friendId: id
                        }
                      }
                    })
                  : setDialogLoginOpen(true)
                }}>
                Chat
              </Button>
    }
  }
  
  const mainView = () =>{
    let userValue = userValues.data.user.data
    let imageSrc =  _.isEmpty(userValue.image) ? "" : userValue.image[0].base64

    console.log("userValue :", userValue, user)

    return  <div>
              <Typography variant="overline" display="block" gutterBottom>
                Profile
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar
                  className={"user-profile"}
                  // sx={{
                  //   height: 80,
                  //   width: 80
                  // }}
                  variant="rounded"
                  alt="Example Alt"
                  src={imageSrc}
                  status="available"
                />
              </Stack>
              <Typography variant="overline" display="block" gutterBottom>
                Name : {userValue.displayName}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                Email : {userValue.email}
              </Typography>

              <ItemFollower id={id} onFollower={(e)=>setDialogFollower(true)} />
          
              <div>
                <ItemFollowing 
                  {...props} 
                  id={id}
                  onFollowing={(input)=>{
                    onCreateAndUpdateFollow({ variables: { input } })
                  }}
                  onDialogLogin={(status)=>{
                    setDialogLoginOpen(true)
                  }}/>
              </div>
              <div> { onButtonChat() } </div>
              <UserPostList 
                {...props} 
                id={id}
                onDialogLogin={(status)=>{
                  setDialogLoginOpen(true)
                }}
                onReport={(id)=>{
                  _.isEmpty(user)
                    ? setDialogLoginOpen(true)    
                    : setReport({open: true, postId:id})
                }}/>
            </div>
  }

  return (
    <div>
      {
        userValues != null && userValues.loading
        ? <CircularProgress />
        : mainView()
      }

      {dialogLoginOpen && (
        <DialogLogin
          {...props}
          open={dialogLoginOpen}
          onComplete={(data)=>{
            console.log("onComplete :", data)

            // props.login(data)
            setDialogLoginOpen(false);
          }}
          onClose={() => {
            setDialogLoginOpen(false);
          }}
        />
      )}

      {
        dialogFollower && 
        <DialogFollower
          open={dialogFollower}
          id={id}
          onFollow={()=>{
            !_.isEmpty(user)
            ? onCreateConversation({ variables: { input: {
                    userId: user.id,
                    friendId: id
                  }
                }
              })
            : setDialogLoginOpen(true)
          }}
          onClose={() => {
            setDialogFollower(false)
          }}
        />
      }

      {report.open && 
        <ReportDialog 
          open={report.open} 
          postId={report.postId} 
          onReport={(e)=>{
          onCreateContactUs({ variables: { input: {
                  userId: user.id,
                  postId: e.postId,     
                  categoryId: e.categoryId,
                  description: e.description
                  } 
              } 
          });

          setReport({open: false, postId:""})
          }}

          // onCreateTContactUs
          onClose={()=>setReport({open: false, postId:""})}/>
      }
    </div>
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

export default connect( mapStateToProps, mapDispatchToProps )(UserView);
