import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton
} from "./Bank.styled";

import React , {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import Editor from "../../components/editor/Editor";

import { gqlBank, gqlCreateBank, gqlUpdateBank } from "../../gqlQuery"

let editValues = undefined;
let initValues =  { name : "",  description: "" }

const Bank = (props) => {
  let history = useHistory();

  const [input, setInput] = useState(initValues)

  const [onCreateBank, resultBankValues] = useMutation(gqlCreateBank
    , {
        onCompleted({ data }) {
          history.push("/banks");
        }
      }
  );

  console.log("resultBankValues :", resultBankValues)

  const [onUpdateBank, resultUpdateBank] = useMutation(gqlUpdateBank, 
    {
      onCompleted({ data }) {
        history.push("/banks");
      }
    }
  );

  console.log("resultUpdateBank : ", resultUpdateBank)

  let { id, mode } = useParams();

  switch(mode){
    case "new":{
      editValues = undefined
      break;
    }

    case "edit":{

      editValues = useQuery(gqlBank, {
        variables: {id},
        notifyOnNetworkStatusChange: true,
      });
     
      console.log("editValues : ", editValues, input)

      if(_.isEqual(input, initValues)) {
        if(!_.isEmpty(editValues)){
          let {loading}  = editValues
          
          if(!loading){
            let {status, data} = editValues.data.bank

            console.log("edit editValues : ", status,  data, data.name)
            if(status){
              setInput({
                name: data.name,
                description: data.description
              })
            }
          }
        }
      }
      break;
    }
  }

  const submitForm = (event) => {
    event.preventDefault();

    console.log("submitForm : ", input);

    switch(mode){
      case "new":{
        onCreateBank({ variables: { input: {
              name: input.name,
              description: input.description
            }
          } 
        });
        break;
      }

      case "edit":{
        let newInput =  {
                          name: input.name,
                          description: input.description
                        }

        console.log("newInput :", newInput, editValues.data.bank.data.id)
        onUpdateBank({ variables: { 
          id: editValues.data.bank.data.id,
          input: newInput
        }});

        break;
      }
    }

  };

  return (
    <div>
      {
        editValues != null && editValues.loading
        ? <div><CircularProgress /></div> 
        :<Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" }
            }}
            // noValidate
            // autoComplete="off"
            onSubmit={submitForm}
          >
            <TextField
              id="filled-basic"
              name="name"
              label="Name"
              variant="filled"
              value={input.name}
              required
              onChange={(e) => {
                console.log("name : ", e.target.value)
                setInput({...input, name:e.target.value})
              }}
            />
            <Editor 
              name="description" 
              label={"Description"}  
              initData={input.description}
              onEditorChange={(newValue)=>{
                setInput({...input, description:newValue})
              }}/>

            <Button type="submit" variant="contained" color="primary">
              CREATE
            </Button>
          </Box>
      }
      </div>
  );
};

export default Bank;
