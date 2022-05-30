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
import { getList } from "../../components/provider/DataProvider";

const Input = styled("input")({
  display: "none"
});

const optionsActive = [
  { label: "Active", id: 1 },
  { label: "Inactive", id: 2 }
];

const User = (props) => {
  const [profile, setProfile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowCofirmPassword] = useState(false);

  const [roleDatas, setRoleDatas] = useState({data: null, total: 0});

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

  let { id, mode } = useParams();

  useEffect(async() => {
    console.log("useParams :", id, mode);

    setRoleDatas( await getList("roles", {}) )
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  };

  const submitForm = (event) => {
    console.log("submitForm : ", validateInput(event));
    event.preventDefault();
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
    console.log("onRolesChange :", values);
  };

  const onIsActiveChange = (event, values) => {
    console.log("onIsActiveChange :", values);
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
            sx={{
              height: 80,
              width: 80
            }}
            variant="rounded"
            alt="Example Alt"
            src={
              !profile
                ? ""
                : profile.type
                ? URL.createObjectURL(profile)
                : profile.url
            }
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

        {/* <label htmlFor="contained-button-file">

          <Input
            accept="image/*"
            id="contained-button-file"
            name="file"
            multiple
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
            <AttachFileIcon />
          </IconButton>
        </label> */}
      </div>

      <TextField
        id="filled-basic"
        name="username"
        label="Username"
        variant="filled"
        required
        value={input.username}
        onChange={onInputChange}
        onBlur={validateInput}
        helperText={error.username}
        error={_.isEmpty(error.username) ? false : true}
      />
      {/* error.username */}

      <TextField
        id="filled-basic"
        name="email"
        label="Email"
        variant="filled"
        required
        value={input.email}
        onChange={onInputChange}
        onBlur={validateInput}
        helperText={error.email}
        error={_.isEmpty(error.email) ? false : true}
      />

      <TextField
        id="filled-basic"
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
        // helperText={"errorText"}
        // error={true}
      />

      <Autocomplete
        multiple
        id="tags-outlined"
        name="userRoles"
        options={_.isEmpty(roleDatas.data) ? [] : roleDatas.data }
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        // filterSelectedOptions
        required
        renderInput={(params) => (
          <TextField
            {...params}
            label="User roles"
            placeholder="role"
            // required
          />
        )}
        onChange={onRolesChange}
        // onChange={onInputChange}
        // onBlur={validateInput}
        // helperText={error.userRoles}
        // error={_.isEmpty(error.userRoles) ? false : true}
      />

      <Autocomplete
        id="tags-outlined"
        name="isActive"
        options={optionsActive}
        // options={top100Films}
        // getOptionLabel={(option) => option.title}
        // defaultValue={top100Films[2]}
        // filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Is active"
            placeholder="active"
            // required
          />
        )}
        onChange={onIsActiveChange}
        // onChange={onInputChange}
        // onBlur={validateInput}
        // helperText={error.isActive}
        // error={_.isEmpty(error.isActive) ? false : true}
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

export default User;
