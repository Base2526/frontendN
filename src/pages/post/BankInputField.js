import React, { useState, useEffect, withStyles } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useQuery } from "@apollo/client";

import {gqlBanks} from "../../gqlQuery"

const BankInputField = ({ values, onChange }) => {
  const [inputList, setInputList] = useState(values);

  let valueBanks = useQuery(gqlBanks, {
    variables: {page: 0, perPage: 100},
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    onChange(inputList);
  }, [inputList]);

  // handle input change
  const onInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { bankAccountName: "", bank: {} }]);
  };

  const onBankIdChange = (e, bank, index) => {
    const newInputList = [...inputList];
    newInputList[index]["bank"] = bank;
    setInputList(newInputList);
  };

  return (
    <Box sx={{ p: 1 }} component="footer">
      <div>
        <Typography variant="overline" display="block" gutterBottom>
          Bank.
        </Typography>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleAddClick}>
          <AddBoxIcon />
        </IconButton>
      </div>

      {inputList.map((x, i) => {

        // console.log("inputList >>", x)
        return (
          <div className="box" key={i}>
            <TextField
              id="input-bank-account-name"
              name="bankAccountName"
              label="Bank account name"
              variant="filled"
              value={x.bankAccountName}
              required
              onChange={(e) => onInputChange(e, i)}
            />

            <Autocomplete
              disablePortal
              id="input-bank-id"
              options={valueBanks.loading ? [] : valueBanks.data.Banks.data}
              getOptionLabel={(option) => option.name}
              defaultValue={ _.isEmpty(x.bank) ? undefined :  x.bank[0]}
              renderInput={(params) => <TextField {...params} label="Bank" required={_.isEmpty(x.bankId) ? true : false} />}
              onChange={(event, values) => onBankIdChange(event, values, i)}
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

export default BankInputField;
