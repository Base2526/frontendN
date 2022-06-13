import React, { useState, useEffect, withStyles } from "react";
import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton
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
import { useParams } from "react-router-dom";
import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { gqlUsers, gqlUser, gqlRoles, gqlCreateUser, gqlUpdateUser } from "../../gqlQuery"

import {convertFileToBase64} from "../../util"

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

const User = (props) => {

  let history = useHistory();

  // const [profile, setProfile] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowCofirmPassword] = useState(false);

  // const [roles, setRoles] = useState([])
  // const [isActive, setIsActive] = useState(undefined)

  // const [roleDatas, setRoleDatas] = useState({data: null, total: 0});

  const [input, setInput] = useState(initValues);

  console.log("== User ==", input)

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "",
    roles: "",
    isActive: ""
  });

  const { error: errorRoles, data: dataRoles, loading: loadingRoles, networkStatus: networkStatusRoles } = useQuery(gqlRoles, {
    variables: {page: 0, perPage: 20},
    notifyOnNetworkStatusChange: true,
  });

  console.log("errorRoles, dataRoles, loadingRoles, networkStatusRoles :", errorRoles, dataRoles, loadingRoles, networkStatusRoles)

  let { id, mode } = useParams();

  console.log("id, mode : ", id, mode)

  switch(mode){

    case "new":{
      editValues = undefined
      break;
    }
   
    case "edit":{

      editValues = useQuery(gqlUser, {
        variables: {id},
        notifyOnNetworkStatusChange: true,
      });

      console.log("editValues : ", editValues, input)

      if(_.isEqual(input, initValues)) {
        if(!_.isEmpty(editValues)){
          let {loading}  = editValues
          
          if(!loading){
            let {status, data} = editValues.data.User

            console.log("edit editValues : ", data)
            if(status){
              setInput({
                username: data.username,
                email: data.email,
                profile: _.isEmpty(data.image) ? undefined : data.image[0] ,
                roles: data.roles,
                isActive: data.isActive
              })
            }
          }
        }
      }
      break;
    }
  }

  const [onCreateUser, { data: dataCreateUser, loading: loadingCreateUser, error: errorCreateUser }] = useMutation(gqlCreateUser, {
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

  console.log("dataCreateUser, loadingCreateUser, errorCreateUser :", dataCreateUser, loadingCreateUser, errorCreateUser)


  const [onUpdateUser, resultUpdateUser] = useMutation(gqlUpdateUser, 
    {
      onCompleted({ data }) {
        history.push("/users");
      }
    }
    // {
    // variables: {
    //   taskId: 1,
    // },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  // }
  );

  console.log("resultUpdateUser :", resultUpdateUser)

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
    let value = _.filter(dataRoles.Roles.data, v => input.roles.includes(v.id))
    
    return  <Autocomplete
              multiple
              id="user-roles"
              name="userRoles"
              options={ dataRoles.Roles.data }
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

    console.log("submitForm : onSubmitForm ", input);

    switch(mode){
      case "new":{
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

                  break;
      }

      case "edit":{

        let image = []
        if(input.profile !== undefined){
          if( input.profile.base64 ){
            image = [_.omitDeep(input.profile, ['__typename', 'id'])]
          }else{
            image = [await convertFileToBase64(input.profile)]
          }
        }

        let newInput = {
          username: input.username,
          email: input.email,
          password: input.password,
          roles: input.roles,
          isActive: input.isActive,
          image
        }

        // console.log("newInput :", newInput)
        onUpdateUser({ variables: { 
          id: editValues.data.User.data.id,
          input: newInput
        }});
      }
    }
  };

  return (
    <div>
      {
        editValues != null && editValues.loading
        ? <div><CircularProgress /></div> 
        : <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" }
            }}
            // noValidate
            // autoComplete="off"
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
              loadingRoles
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
      }
    </div>
  );
};

export default User;
