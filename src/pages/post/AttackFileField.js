import React, { useState, useEffect, withStyles } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import _ from "lodash";

const Input = styled("input")({
  display: "none"
});

const AttackFileField = ({ values, onChange, onSnackbar }) => {
  const [inputList, setInputList] = useState(values);

  // useEffect(() => {
  //   setInputList(values);
  // }, []);

  useEffect(() => {
    // onChange(inputList);

    console.log("useEffect > : ", inputList);
  }, [inputList]);

  // handle input change
  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // // handle click event of the Add button
  // const handleAddClick = () => {
  //   setInputList([...inputList, { files: {} }]);
  // };

  const onFileChange = (e) => {
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
    // file
    // console.log("onFileChange : ", e.target.files);
    // const { name, value } = e.target;
    // const list = [...inputList];
    // list[index][name] = e.target.files[0];
    // setInputList(list);
    // console.log("onFileChange : ", e.target.files);

    let newInputList = [...inputList];
    for (var i = 0; i < e.target.files.length; i++) {
      // console.log("onFileChange : ", e.target.files[i]);
      let file = e.target.files[i];
      if (file.type) {
        console.log("onFileChange type #1 : ", i, file.type);

        newInputList = [...newInputList, file];
      }
    }
    console.log("onFileChange type #2 : ", newInputList);

    setInputList(newInputList);
  };

  return (
    <Box sx={{ p: 1 }} component="footer">
      <Typography variant="overline" display="block" gutterBottom>
        Attack file
      </Typography>
      <Stack direction="row" spacing={2}>
        {_.map(
          _.filter(inputList, (v) => !v.isDelete),
          (file, index) => {
            console.log("Stack :", file);

            if (file.type) {
              // new file
              return (
                <div style={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      height: 80,
                      width: 80,
                      border: "1px solid #cccccc",
                      padding: "5px"
                    }}
                    variant="rounded"
                    alt="Example Alt"
                    src={URL.createObjectURL(file)}
                    // src="https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg?w=2000"
                  />
                   <IconButton
                    style={{
                      position: "absolute",
                      right: 0,
                      top:0
                    }}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      let newInputList = [
                        ...inputList.slice(0, index),
                        ...inputList.slice(index + 1, inputList.length)
                      ];

                      setInputList(newInputList);

                      // console.log(
                      //   "delete, new file : ",
                      //   index,
                      //   inputList,
                      //   newInputList
                      // );
                      onSnackbar({open:true, message:"Delete image"});
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              );
            } else {
              // old file
              return (
                <div style={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      height: 80,
                      width: 80,
                      border: "1px solid #cccccc",
                      padding: "5px"
                    }}
                    variant="rounded"
                    alt="Example Alt"
                    src={file.url}
                    // src="https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg?w=2000"
                  />
                   <IconButton
                    style={{
                      position: "absolute",
                      right: 0,
                      top:0
                    }}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      let newInputList = [...inputList];
                      newInputList[index] = {
                        ...newInputList[index],
                        isDelete: true
                      };
                      setInputList(newInputList);

                      onSnackbar({open:true, message:"Delete image"});
                      // console.log("delete, old file :", index, newInputList);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              );
            }
          }
        )}
      </Stack>
      <label htmlFor="contained-button-file">
        {/* <img src={file} /> */}

        <Input
          accept="image/*"
          id="contained-button-file"
          name="file"
          multiple
          type="file"
          onChange={(e) => {
            onFileChange(e);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <AttachFileIcon />
        </IconButton>
      </label>
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </Box>
  );
};

export default AttackFileField;
