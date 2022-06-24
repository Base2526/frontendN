import React, { useState, useEffect, withStyles } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import _ from "lodash";

import Checkboxs from "./checkboxs";

const SearchBar = ({ keyword, onChange, onKeyDown }) => {
  const [choiceTopic, setChoiceTopic] = useState([
    { key: 0, name: "ชื่อเรื่อง", checked: true },
    { key: 1, name: "ชื่อ-นามสกุล บัญชีผู้รับเงินโอน", checked: true },
    { key: 2, name: "เลขบัตรประชาชนคนขาย", checked: false },
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

  return (
    <Container sx={{ py: 1 }} maxWidth="xl" >
      <TextField
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
