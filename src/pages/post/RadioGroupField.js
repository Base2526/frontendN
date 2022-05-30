import React, { useState, useEffect, withStyles } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";

const RadioGroupField = ({ values, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Publish</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="draft"
        name="radio-buttons-group"
        onChange={onChange}
      >
        <Stack direction="row" spacing={2}>
          {/* <FormControlLabel value="draft" control={<Radio />} label="Draft" />
          <FormControlLabel
            value="publish"
            control={<Radio />}
            label="Publish"
          /> */}
          {values.map((v) => {
            return (
              <FormControlLabel
                value={v.value}
                control={<Radio />}
                label={v.label}
              />
            );
          })}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
