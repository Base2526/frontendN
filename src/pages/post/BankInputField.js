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
import LinearProgress from '@mui/material/LinearProgress';

import _ from "lodash"

import {gqlBanks} from "../../gqlQuery"

const BankInputField = ({ values, onChange }) => {
  const [inputList, setInputList] = useState(values);

  let valueBanks = useQuery(gqlBanks, { notifyOnNetworkStatusChange: true, });

  console.log("valueBanks :", valueBanks)

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
    setInputList([...inputList, { bankAccountName: "", bankId: "" }]);
  };

  const onBankIdChange = (e, bank, index) => {
    console.log("onBankIdChange ", bank)
    let newInputList = [...inputList];
    if(bank !== null){
      newInputList[index].bankId = bank.id;
    }else{
      newInputList[index].bankId = "";
    }
    setInputList(newInputList);
  };

  const bankView = (item, i) =>{
    let value =  _.find(valueBanks.data.banks.data, (v)=>item.bankId === v.id)
    return  <Autocomplete
              disablePortal
              id="input-bank-id"
              options={valueBanks.data.banks.data}
              getOptionLabel={(option) => option.name}
              defaultValue={ value }
              renderInput={(params) => <TextField {...params} label="Bank" required={_.isEmpty(item.bankId) ? true : false} />}
              onChange={(event, values) => onBankIdChange(event, values, i)}
            />
  }

  return (
    <div>
      {
        valueBanks.loading
        ? <LinearProgress sx={{width:"100px"}} /> 
        : <Box sx={{ p: 1 }} component="footer">
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
      
                  {bankView(x, i)}
      
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
      }
    </div>
  );
};

export default BankInputField;
