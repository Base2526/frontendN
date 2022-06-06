import React, { useState, useEffect, withStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from "@mui/material/Typography";

const TelInputField = ({ values, onChange }) => {
  const [inputList, setInputList] = useState(values);

  useEffect(() => {
    onChange(inputList);
  }, [inputList]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    // list[index][name] = value;
    list[index] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  return (
    <Box sx={{ /*bgcolor: "background.paper",*/ p: 1 }} component="footer">
      <div>
        <Typography variant="overline" display="block" gutterBottom>
          Tel.
        </Typography>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleAddClick}>
          <AddBoxIcon />
        </IconButton>
      </div>
      {inputList.map((tel, i) => {
        return (
          <div className="box" key={i}>
            <TextField
              id="filled-basic"
              name="tel"
              label="Tel"
              variant="filled"
              value={tel}
              required
              onChange={(e) => handleInputChange(e, i)}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => handleRemoveClick(i)}>
              <RemoveCircleIcon />
            </IconButton>
          </div>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </Box>
  );
};

export default TelInputField;
