import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
/* parses check box data from props.list element
 * @params {{title: string, list:{name: string, id: number}[]}} props
 */
const checkboxs = (props) => {
  const checkbox = props.list.map((m) => (
    <FormControlLabel
      id={m.key}
      control={
        <Checkbox id={m.key} checked={m.checked} onClick={props.handleChange} />
      }
      label={m.name}
    />
  ));

  return (
    <Container sx={{ py: 1 }} maxWidth="xl" >
   {props.list.map((m) => (
      <FormControlLabel
        fullWidth
        id={m.key}
        control={
          <Checkbox id={m.key} checked={m.checked} onClick={props.handleChange} />
        }
        label={m.name}
      />
    ))} 
    </Container>
  );
};

export default checkboxs;
