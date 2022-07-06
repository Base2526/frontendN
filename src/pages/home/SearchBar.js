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
import ClearIcon from '@mui/icons-material/Clear';

import Checkboxs from "./checkboxs";

const SearchBar = (props) => {
  let { onSearch } = props
  let [keyword, setKeyword] = useState("")

  const [choiceTopic, setChoiceTopic] = useState([
    { key: 0, name: "ชื่อเรื่องร้องเรียน", checked: true },
    { key: 1, name: "ชื่อ-นามสกุล", checked: true },
    { key: 2, name: "เลขบัตรประชาชน", checked: false },
    { key: 3, name: "บัญชีธนาคาร", checked: false },
    { key: 4, name: "เบอร์โทรศัพท์", checked: false }
  ]);

  return (
    <Container sx={{ py: 1 }} maxWidth="xl" >
      <Autocomplete
        disableClearable
        value={keyword}
        disablePortal
        // id="combo-box-demo"
        options={[]}
        freeSolo={true}
        popupIcon={""}
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
            onChange={ev=>{
              setKeyword(ev.target.value)
            }}
            onKeyDown={(ev) => {
              if (ev.keyCode == 13) {
                onSearch(ev.target.value, choiceTopic)
              }
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment:
                <React.Fragment>
                  {params.InputProps.startAdornment}
                  <SearchIcon className="search-icon" />
                </React.Fragment>
              ,
              endAdornment:
                !_.isEmpty(keyword) 
                ? <IconButton onClick={(ev)=>{
                    setKeyword("")
                    onSearch("", choiceTopic)
                  }}><ClearIcon /></IconButton>
                : <div />
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
        
      />
      <Checkboxs
        list={choiceTopic}
        handleChange={(event) =>{
          setChoiceTopic(
            _.map(choiceTopic, choice => {
              if (choice.key == event.target.id) {
                return { ...choice, checked: !choice.checked };
              }
              return choice;
            })
          );
        }}
      />
    </Container>
  );
};

export default SearchBar;
