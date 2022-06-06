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
// import { getList } from "../../components/provider/DataProvider";

import { useQuery, useMutation } from "@apollo/client";
import { gqlUsers, gqlUser, gqlRoles, gqlCreateUser } from "../../gqlQuery"

import {convertFileToBase64} from "../../util"

const Input = styled("input")({
  display: "none"
});

let optionsIsactive = [
  { name: "Active", id: "active" },
  { name: "Unactive", id: "unactive" }
]

let editValues = undefined;
const User = (props) => {
  const [profile, setProfile] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowCofirmPassword] = useState(false);

  const [roles, setRoles] = useState([])
  const [isActive, setIsActive] = useState(undefined)

  // const [roleDatas, setRoleDatas] = useState({data: null, total: 0});

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onValueRoles = () =>{
    if( _.isEmpty(roles) ){
      if(!_.isEmpty(editValues)){
        let {loading}  = editValues
        if(!loading){
          let {status, data} = editValues.data.User
          if(status){
            if( !loadingRoles && !_.isEmpty(dataRoles.Roles) ){
              setRoles(_.filter(dataRoles.Roles.data, (v)=>data.roles.includes(v.id) ))  
            }
          }
        }
      }
    }
  }

  const onValueIsActive = () =>{
    if( _.isEmpty(isActive) ){
      if(!_.isEmpty(editValues)){
        let {loading}  = editValues
        if(!loading){
          let {status, data} = editValues.data.User
          if(status){
            console.log("setIsActive :", data.isActive, optionsIsactive[0])
            setIsActive(data.isActive === "active" ? optionsIsactive[0] : optionsIsactive[1])
          }
        }
      }
    }
  }

  const { error: errorRoles, data: dataRoles, loading: loadingRoles, networkStatus: networkStatusRoles } = useQuery(gqlRoles, {
    variables: {page: 0, perPage: 20},
    notifyOnNetworkStatusChange: true,
  });

  console.log("errorRoles, dataRoles, loadingRoles, networkStatusRoles :", errorRoles, dataRoles, loadingRoles, networkStatusRoles)

  let { id, mode } = useParams();
  
  // useEffect(async() => {
    

  console.log("id, mode : ", id, mode)

    
  //   switch(mode){
  //     case "new":{
  //       setInput({...input, username: "", email: ""})
  //       break;
  //     }
  //   }

  // }, []);

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

      console.log("editValues : ", editValues)

      onValueRoles()
      onValueIsActive()
      break;
    }
  }
  // useEffect(async() => {
  //   console.log("useParams :", id, mode);

  //   // setRoleDatas( await getList("roles", {}) )
  // }, []);

  const [onSubmitForm, { data: dataCreateUser, loading: loadingCreateUser, error: errorCreateUser }] = useMutation(gqlCreateUser, {
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

  // if (loading) return 'Submitting...';
  // if (error) return `Submission error! ${error.message}`;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  };

  const onProfileChange = (e) => {
    // let newInputList = [...inputList];
    // for (var i = 0; i < e.target.files.length; i++) {
    //   // console.log("onFileChange : ", e.target.files[i]);
    //   let file = e.target.files[i];
    //   if (file.type) {
    //     console.log("onFileChange type #1 : ", i, file.type);
    //     newInputList = [...newInputList, file];
    //   }
    // }
    // console.log("onFileChange type #2 : ", newInputList);
    // setInputList(newInputList);

    setProfile(e.target.files[0]);
    console.log("e.target.files : ", e.target.files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const list = [...inputList];
    // list[index][name] = value;
    // setInputList(list);

    console.log("handleInputChange :", value);
  };

  const onRolesChange = (event, values) => {
    setRoles(values)
  };

  const onIsActiveChange = (event, values) => {
    console.log("onIsActiveChange :", values)
    setIsActive(values)
  };

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

  const onProfileSrc = () =>{
    if(profile === undefined){
      if(!_.isEmpty(editValues)){
        let {loading}  = editValues
        if(!loading){
          let {status, data} = editValues.data.User
          if(status){
            return  _.isEmpty(data.image) ? "" : data.image[0].base64
          }
        }
      }
    }else{

      if(profile.base64){
        return profile.base64
      }else{
        return URL.createObjectURL(profile)
      }
    }

    return "";
  }

  const onValueUsername = () =>{
    if( _.isEmpty(input.username) ){

      // mode
      console.log("onValueUsername > ", editValues)
      if(!_.isEmpty(editValues)){
        let {loading}  = editValues
        if(!loading){
          let {status, data} = editValues.data.User
          if(status){
            return  data.username
          }
        }
      }
    }else{
      return input.username
    }

    return "";
  }

  const onValueEmail = () =>{
    if( _.isEmpty(input.email) ){
      if(!_.isEmpty(editValues)){
        let {loading}  = editValues
        if(!loading){
          let {status, data} = editValues.data.User
          if(status){
            return  data.email
          }
        }
      }
    }else{
      return input.email
    }

    return "";
  }

  const submitForm = async(event) => {
    event.preventDefault();

    console.log("submitForm : onSubmitForm ", profile, input);

    let inputN = {
      username: input.username,
      password: input.password,
      email: input.email,
      // roles,
      isActive: isActive,
    }
     
    onSubmitForm({ variables: { input: {
                                      username: input.username,
                                      email: input.email,
                                      password: input.password,
                                      roles: _.map(roles, (v)=>v.id),
                                      isActive: isActive,
                                      image: profile === null ? [] : await convertFileToBase64(profile)
                                    }
                              } 
                  });
  };

  return (
    <Box
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
            src={onProfileSrc()}
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
              onProfileChange(e);
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
        // value={input.username}
        value={onValueUsername()}
        onChange={onInputChange}
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
        // value={input.email}
        value={onValueEmail()}
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
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
      <Autocomplete
        multiple
        id="user-roles"
        name="userRoles"
        options={ loadingRoles ? [] : dataRoles.Roles.data }
        getOptionLabel={(option) => option.name}
        value={roles}
        required
        renderInput={(params) => (
          <TextField
            {...params}
            label="User roles"
            placeholder="role"
            required={roles.length === 0 ? true : false}
          />
        )}
        onChange={onRolesChange}
      />

      <Autocomplete
        id="user-isactive"
        name="isActive"
        options={optionsIsactive}
        getOptionLabel={(option) => option.name}
        value={ isActive }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Unactive"
            placeholder="Unactive"
            required={ isActive === undefined ? true : false}
          />
        )}
        onChange={onIsActiveChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

export default User;
