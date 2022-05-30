import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton
} from "./NewPost.styled";

import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";

import BankInputField from "./BankInputField";
import AttackFileField from "./AttackFileField";
import RadioGroupField from "./RadioGroupField";
import TelInputField from "./TelInputField";

import PopupSnackbar from "../home2/PopupSnackbar";
import Footer from "../home2/Footer";

import Editor from "../../components/editor/Editor";

const Post = () => {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const [snackbar, setSnackbar] = useState({open:false, message:""});

  // const snackbarClick = () => {
  //   setSnackbarOpen(true);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const list = [...inputList];
    // list[index][name] = value;
    // setInputList(list);

    console.log("handleInputChange :", value);
  };

  const submitForm = (event) => {
    event.preventDefault();

    console.log("submitForm");
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <h2 className="newUserTitle">New Post</h2> */}
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
            <TextField
              id="filled-basic"
              name="title"
              label="Title"
              variant="filled"
              // value={x.lastName}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <TextField
              id="filled-basic"
              name="nameSubname"
              label="Name Subname"
              variant="filled"
              // value={x.lastName}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <TextField
              id="filled-basic"
              name="idCard"
              label="ID Card"
              variant="filled"
              // value={x.lastName}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <TextField
              id="filled-basic"
              name="amount"
              label="Amount"
              variant="filled"
              type="number"
              // InputLabelProps={{
              //   shrink: true
              // }}
              onChange={(e) => handleInputChange(e)}
            />

            <DesktopDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              required
              renderInput={(params) => <TextField {...params} />}
            />

            <TelInputField
              values={[{ tel: "" }]}
              onChange={(data) => {
                console.log("Tel onChange >> :", data);
              }}
            />

            <BankInputField
              values={[{ firstName: "", lastName: "", file: {} }]}
              onChange={(data) => {
                console.log("Bank onChange >> :", data);
              }}
            />

            <Editor label={"Description"} />

            <AttackFileField
              values={[
                {
                  url:
                    "https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg?w=2000"
                },
                {
                  url:
                    "https://yt3.ggpht.com/3Km7djEDB6Ue9GQ4Hh4hkeV_9PF0-ZBJOv7D7vBt5w_11E5Vr3-gDZHSYlxsf6kD7XYpjXZ-UA=s900-c-k-c0x00ffffff-no-rj"
                }
              ]}
              onChange={(data) => {
                console.log("AttackFileField >> :", data);
              }}
              // snackbarOpen
              onSnackbar={(data) => {
                // console.log("onSnackbarOpen >> :", data);
                setSnackbar(data);
              }}
            />

            <RadioGroupField
              values={[
                { value: "publish", label: "Publish" },
                { value: "draft", label: "Draft" }
              ]}
              onChange={(e, v) => {
                console.log("onChange : ", e, value);
              }}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            submit
          </Button>
        </Box>
      </LocalizationProvider>

      {snackbar.open && (
        <PopupSnackbar
          isOpen={snackbar.open}
          message={snackbar.message}
          onClose={() => {
            setSnackbar({...message, open:false});
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Post;
