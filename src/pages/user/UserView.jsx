import React, { useState, useEffect, withStyles } from "react";
import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton,
  ButtonWrapper
} from "./User.styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useParams, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory, useLocation } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";



import { useQuery, useMutation } from "@apollo/client";
import { gqlUsers, gqlUser, gqlRoles, gqlCreateUser, gqlUpdateUser, gqlPostsByOwner, gqlConversations, gqlCreateConversation } from "../../gqlQuery"

import {convertFileToBase64} from "../../util"

import Tabs from "../../components/tab/Tabs";
import Panel from "../../components/tab/Panel";
import ReadMoreMaster from "../../utils/ReadMoreMaster"

import UserPostList from "./UserPostList"

const Input = styled("input")({
  display: "none"
});


let editValues = undefined;
let initValues =  {
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    profile: undefined,
                    roles: [],
                    isActive: false
                  }

const UserView = (props) => {
  let history = useHistory();

  const { pathname } = useLocation();

  let userId= "62a2f65dcf7946010d3c7547";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "",
    roles: "",
    isActive: ""
  });

  const rolesValue = useQuery(gqlRoles, {
    variables: {page: 0, perPage: 20},
    notifyOnNetworkStatusChange: true,
  });

  let { id } = useParams();

  editValues = useQuery(gqlUser, {
    variables: {id},
    notifyOnNetworkStatusChange: true,
  });

  const postsByOwner = useQuery(gqlPostsByOwner, {
    variables: { ownerId: id },
    notifyOnNetworkStatusChange: true,
  });
  console.log("postsByOwner :", postsByOwner)

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
  
  const mainView = () =>{
    console.log("view :", editValues)

    let user = editValues.data.User.data
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
              <Button
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                  // history.push("/message");

                  // onCreateConversation({ variables: { input: {
                  //       userId: userId,
                  //       friendId: id
                  //     }
                  //   }
                  // }); 
                }}>
                Follow
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                  onCreateConversation({ variables: { input: {
                        userId: userId,
                        friendId: id
                      }
                    }
                  }); 
                }}>
                Chat
              </Button>
              <>
                <UserPostList id={id}/>                  
              </>
            </div>

  }

  return (
    <div>
      {
        editValues != null && editValues.loading
        ? <div><CircularProgress /></div> 
        : mainView()
      }
    </div>
  );
};

export default UserView;
