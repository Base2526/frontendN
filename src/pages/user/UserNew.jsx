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
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import { useQuery, useMutation } from "@apollo/client";
import { gqlUsers, gqlRoles, gqlCreateUser } from "../../gqlQuery"
import {convertFileToBase64} from "../../util"

const Input = styled("input")({
  display: "none"
});

let initValues =  {
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    profile: undefined,
                    roles: [],
                    isActive: false
                  }

const UserNew = (props) => {
  let history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowCofirmPassword] = useState(false);
  const [input, setInput] = useState(initValues);

  const { pathname } = useLocation();

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

  const rolesValue = useQuery(gqlRoles, { notifyOnNetworkStatusChange: true });

  const [onCreateUser, resultCreateUser] = useMutation(gqlCreateUser, {
    variables: {
      taskId: 1,
    },
    refetchQueries: () => [{
      query: gqlUsers,
      variables: { 
        // status: 'OPEN',
      },
    }],
  });
  console.log("resultCreateUser :", resultCreateUser)
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowCofirmPassword = () =>
    setShowCofirmPassword(!showCofirmPassword);
  const handleMouseDownCofirmPassword = () =>
    setShowCofirmPassword(!showCofirmPassword);

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username": {
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
        }

        case "email": {
          if (!value) {
            stateObj[name] = "Please enter Email.";
          }
          break;
        }

        case "password": {
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
        }

        case "confirmPassword": {
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
        }

        default:
          break;
      }

      return stateObj;
    });
  };

  const rolesView = () =>{
    let value = _.filter(rolesValue.data.Roles.data, v => input.roles.includes(v.id))
    
    return  <Autocomplete
              multiple
              id="user-roles"
              name="userRoles"
              options={ rolesValue.data.Roles.data }
              getOptionLabel={(option) => option.name}
              value={ value }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User roles"
                  placeholder="role"
                  required={ input.roles.length === 0 ? true : false }
                />
              )}
              onChange={(event, values)=>{
                let newRoles = _.map(values, v=>v.id)
                setInput({...input, roles:newRoles})
              }}
            />
  }

  const isActiveView = () =>{

    let optionsIsactive = [
      { name: "Active", id: "active" },
      { name: "Unactive", id: "unactive" }
    ]

    let value = undefined
    if(input.isActive === undefined) {
      value = optionsIsactive[1]
    }else{
      value = _.find(optionsIsactive, v=> v.id === input.isActive )
    }

    return  <Autocomplete
              id="user-isactive"
              name="isActive"
              options={optionsIsactive}
              getOptionLabel={(option) => option.name}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Unactive"
                  placeholder="Unactive"
                  required={ input.isActive === undefined ? true : false }
                />
              )}
              onChange={(event, value)=>{
                setInput({...input, isActive: value.id})
              }}
            />
  }
  
  const submitForm = async(event) => {
    event.preventDefault();

    onCreateUser({ variables: { input: {
          username: input.username,
          email: input.email,
          password: input.password,
          roles: input.roles,
          isActive: input.isActive,
          image: input.profile === undefined ? [] : await convertFileToBase64(profile)
        }
      } 
    });
  };

  return (
    <div>
     <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" }
        }}
        onSubmit={submitForm}
      >
        <div>
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
              src={input.profile == undefined ? "" : input.profile.base64 ? input.profile.base64: URL.createObjectURL(input.profile)}
            />
          </Stack>
          <label htmlFor="profile">
            <Input
              accept="image/*"
              id="profile"
              name="file"
              // multiple
              type="file"
              onChange={(e) => {
                setInput({...input, profile:e.target.files[0]})
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <TextField
          id="user-username"
          name="username"
          label="Username"
          variant="filled"
          required
          value={input.username}
          onChange={(e)=>{
            setInput({...input, username:e.target.value})
          }}
          onBlur={validateInput}
          // helperText={_.isEmpty(error.username)? "Input username" : error.username}
          helperText={error.username}
          error={_.isEmpty(error.username) ? false : true}
        />
        <TextField
          id="user-email"
          name="email"
          label="Email"
          variant="filled"
          required
          value={input.email}
          onChange={(e)=>{
            setInput({...input, email:e.target.value})
          }}
          onBlur={validateInput}
          helperText={error.email}
          error={_.isEmpty(error.email) ? false : true}
        />
        <TextField
          id="user-password"
          name="password"
          label="Password"
          variant="filled"
          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          required
          value={input.password}
          onChange={(e)=>{
            setInput({...input, password:e.target.value})
          }}
          onBlur={validateInput}
          helperText={error.password}
          error={_.isEmpty(error.password) ? false : true}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="filled-basic"
          name="confirmPassword"
          label="Confirm password"
          variant="filled"
          type={showCofirmPassword ? "text" : "password"}
          required
          value={input.confirmPassword}
          onChange={(e)=>{
            setInput({...input, confirmPassword:e.target.value})
          }}
          onBlur={validateInput}
          helperText={error.confirmPassword}
          error={_.isEmpty(error.confirmPassword) ? false : true}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCofirmPassword}
                  onMouseDown={handleMouseDownCofirmPassword}
                >
                  {showCofirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        {
          rolesValue.loading
          ? <LinearProgress sx={{width:"100px"}} /> 
          : rolesView()
        }

        {
          isActiveView()
        }
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </div>
  );
};

export default UserNew;
