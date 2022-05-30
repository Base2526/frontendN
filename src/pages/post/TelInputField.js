import React, { useState, useEffect, withStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TelInputField = ({ values, onChange }) => {
  const [inputList, setInputList] = useState(values);

  useEffect(() => {
    onChange(inputList);
  }, [inputList]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
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
    setInputList([...inputList, { tel: "" }]);
  };

  return (
    <Box sx={{ /*bgcolor: "background.paper",*/ p: 1 }} component="footer">
      <Button variant="contained" onClick={handleAddClick}>
        Add
      </Button>

      {inputList.map((x, i) => {
        return (
          <div className="box">
            <TextField
              id="filled-basic"
              name="tel"
              label="Tel"
              variant="filled"
              value={x.tel}
              required
              onChange={(e) => handleInputChange(e, i)}
            />
            <Button variant="contained" onClick={() => handleRemoveClick(i)}>
              Remove
            </Button>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </Box>
  );
};

export default TelInputField;
