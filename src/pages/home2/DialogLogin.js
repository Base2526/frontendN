import * as React from "react";
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

import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";

const DialogLogin = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Sign in to Banlist</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Get a free account, no credit card required
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            render={(renderProps) => (
              // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
              <GoogleLoginButton
                onClick={renderProps.onClick}
                buttonText="Login"
                className="mt-3 mb-3"
              />
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </DialogContentText>
        </DialogContent>
        <DialogContent>
            <Typography variant="body2" color="text.secondary">By continuing, you agree to Banlist Terms of Service, Privacy Policy</Typography>
        </DialogContent>
    </Dialog>

    
  );
};

export default DialogLogin;
