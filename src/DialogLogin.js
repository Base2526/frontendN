import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";

import { useQuery, useMutation } from "@apollo/client";

import { gqlLogin } from "./gqlQuery"

import { auth, getPermissions } from "./AuthProvider"

import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { GoogleLogin, useGoogleLogin  } from "react-google-login";

const DialogLogin = (props) => {
  const { onClose, selectedValue, open } = props;

  const [input, setInput]   = useState({ username: "",  password: ""});
  const [onLogin, resultLogin] = useMutation(gqlLogin, {
    // update: (cache, {data: {createPost}}) => {

    //   let {state} = history.location
    //   switch(state.from){
    //     case "/posts":{
    //       const data1 = cache.readQuery({
    //         query: gqlPosts,
    //         variables: {
    //           page: 0, 
    //           perPage: 100
    //         }
    //       });

    //       if(data1 != null){
    //         let newPosts = {...data1.Posts}
    //         let newData = [...newPosts.data, createPost]

    //         newPosts = {...newPosts, data: newData}

    //         cache.writeQuery({
    //           query: gqlPosts,
    //           data: {
    //             Posts: newPosts
    //           },
    //           variables: {
    //            page: 0, 
    //             perPage: 100
    //           }
    //         });
    //       }
    //       break;
    //     }

    //     default:{

    //       break;
    //     }
    //   }
    // },
    onCompleted({ data }) {
      // console.log("bookmark :::: onCompleted")

      // history.push("/posts")
    },
  });

  if(resultLogin.called && !resultLogin.loading){
    console.log("resultLogin :", resultLogin)

    if(resultLogin.data.login.status){
      auth(resultLogin.data.login.data)
      onClose(false)
    }else{
      // messages
    }
    
  }

  console.log("getPermissions :", getPermissions())

  useEffect(()=>{
    console.log("input :", input)
  }, [input])

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  // https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/utils/refreshToken.js
  const responseGoogle = async(response) => {
    console.log("responseGoogle :", response);

    const newAuthRes = await response.reloadAuthResponse();

    console.log("newAuthRes :", newAuthRes)

    // localStorage.setItem('authToken', newAuthRes.id_token);
  };

  const { signIn } = useGoogleLogin({
    responseGoogle,
    responseGoogle,
    clientId: "693724870615-2hkmknke3sj6puo9c88nk67ouuu9m8l1.apps.googleusercontent.com",
    isSignedIn: true,
    accessType: 'offline',
    responseType: 'code',
    prompt: 'consent',
  });

  const handleSubmit = (event) =>{
    event.preventDefault();

    console.log("handleSubmit")

    // onLogin
    onLogin({ variables: { input: { username: input.username,  password: input.password }} })
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formUserLogin = () =>{
    return  <form onSubmit={handleSubmit}>
              <div>
                <label>Username </label>
                <input type="text" name="username" value={input.username} onChange={onInputChange} required />
              </div>
              <div>
                <label>Password </label>
                <input type="password" name="password" value={input.password} onChange={onInputChange} required />
              </div>
              <button type="submit">Login</button>
            </form>
  }

  return (
    <Dialog 
    onClose={(e)=>{
      onClose(false)
    }} 
    open={open}>
      <DialogTitle>Sign in to Banlist</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Get a free account, no credit card required
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* <GoogleLogin
            clientId="693724870615-2hkmknke3sj6puo9c88nk67ouuu9m8l1.apps.googleusercontent.com"
            render={(renderProps) => (
              // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
              <GoogleLoginButton
                onClick={(e)=>{
                  renderProps.onClick
                }}
                buttonText="Login"
                className="mt-3 mb-3"
              />
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}

          {
            formUserLogin()
          }

          <button /*onClick={signIn}*/
            onClick={(e)=>{
              let result =  login("a", "b")
              console.log("result :", result)
            }} className="button">Sign in with Google</button>
        </DialogContentText>
        </DialogContent>
        <DialogContent>
            <Typography variant="body2" color="text.secondary">By continuing, you agree to Banlist Terms of Service, Privacy Policy</Typography>
        </DialogContent>
    </Dialog>

    
  );
};

export default DialogLogin;
