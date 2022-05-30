import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton
} from "./Role.styled";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Editor from "../../components/editor/Editor";

const NewRole = (props) => {
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" }
      }}
      // noValidate
      // autoComplete="off"
      onSubmit={submitForm}
    >
      <TextField
        id="filled-basic"
        name="title"
        label="Title"
        variant="filled"
        // value={x.lastName}
        required
        onChange={(e) => handleInputChange(e)}
      />
      <Editor label={"Description"} />

      <Button type="submit" variant="contained" color="primary">
        CREATE
      </Button>
    </Box>
  );
};

export default NewRole;
