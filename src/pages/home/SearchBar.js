import React, { useState, useEffect, withStyles } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import _ from "lodash";

// import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { top100Films } from "./100movies";
// import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
// import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Checkboxs from "./checkboxs";

const SearchBar = ({ keyword, onChange, onKeyDown }) => {
  const [choiceTopic, setChoiceTopic] = useState([
    { key: 0, name: "ชื่อเรื่องร้องเรียน", checked: true },
    { key: 1, name: "ชื่อ-นามสกุล", checked: true },
    { key: 2, name: "เลขบัตรประชาชน", checked: false },
    { key: 3, name: "บัญชีธนาคาร", checked: false },
    { key: 4, name: "เบอร์โทรศัพท์", checked: false }
  ]);

  const handleChange = (event) => {
    const id = event.target.id;
    setChoiceTopic(
      _.map(choiceTopic, (v, k) => {
        // console.log("choiceTopic :", v.key);
        if (v.key == id) {
          return { ...v, checked: !v.checked };
        }
        return v;
      })
    );
  };

  /*
  No recent searches
  */

  return (
    <Container sx={{ py: 1 }} maxWidth="xl" >
      {/* <TextField
        fullWidth
        label="Input keyword search"
        onChange={(e) => onChange(e.target.value, choiceTopic)}
        value={keyword}
        InputProps={{
          endAdornment: !keyword ? (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => onChange("", choiceTopic)}
            >
              <CancelRoundedIcon />
            </IconButton>
          )
        }}
        onKeyDown={onKeyDown}
      /> */}

      <Autocomplete
        value={keyword}
        disablePortal
        id="combo-box-demo"
        options={[]}
        // sx={{ width: 300, mt: 2 }}
        freeSolo={true}
        popupIcon={""}
        // onChange={(e, value) => {
        //   console.log("onChange value : ", e.target.value);
        //   if (value == null) {
        //     setKeyword("");
        //   } else {
        //     setKeyword(value.label);
        //   }
        // }}

        onChange={(e) => onChange(e.target.value, choiceTopic)}
        renderOption={(props, option) => {
          return (
            <>
              <Box {...props}>X{option.label}</Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  let newOptions = [...options];
                  newOptions = newOptions.filter((e) => e.id != option.id);

                  console.log("Delete item : ", option.id, newOptions);

                  setOptions(newOptions);
                }}
              >
                Delete
              </Button>
            </>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Input keyword"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment:
                !keyword  ? (
                  <React.Fragment>
                    {params.InputProps.startAdornment}
                    {/* <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    > */}
                    <SearchIcon className="search-icon" />
                    {/* </IconButton> */}
                  </React.Fragment>
                ) : (
                  <div />
                )
            }}
          />
        )}
        
        // noOptionsText={
        //   <Box
        //     display="flex"
        //     justifyContent="space-between"
        //     alignItems="center"
        //   >
        //     Recent not available
        //     {/* <Button
        //       variant="outlined"
        //       color="primary"
        //       onClick={() => {
        //         let newOptions = [...options];
        //         const min = 1;
        //         const max = 100;
        //         const rand = min + Math.random() * (max - min);

        //         newOptions = [
        //           ...newOptions,
        //           {
        //             id: Math.floor(rand),
        //             label: "The Dark Knight : " + Math.floor(rand),
        //             year: 2008
        //           }
        //         ];

        //         setOptions(newOptions);
        //       }}
        //     >
        //       Add New Recent
        //     </Button> */}
        //   </Box>
        // }
        onKeyDown={ (e) => onKeyDown(e, choiceTopic) }
      />


      <Checkboxs
        list={choiceTopic}
        // title="Claims"
        handleChange={(event) => handleChange(event)}
      />
    </Container>
  );
};

export default SearchBar;
