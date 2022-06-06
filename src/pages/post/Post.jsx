import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton
} from "./NewPost.styled";

import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router-dom";

import BankInputField from "./BankInputField";
import AttackFileField from "./AttackFileField";
import RadioGroupField from "./RadioGroupField";
import TelInputField from "./TelInputField";

import PopupSnackbar from "../home2/PopupSnackbar";
import Footer from "../home2/Footer";

import Editor from "../../components/editor/Editor";

import { useQuery, useMutation } from "@apollo/client";
import { gqlUsers, gqlPost, gqlRoles, gqlCreatePost, gqlUpdatePost } from "../../gqlQuery"
import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import {convertFileToBase64} from "../../util"

let editValues = undefined;
let initValues = {
  title: "", 
  nameSubname: "", 
  idCard: "", 
  amount: "",
  tels: [],
  banks: [],
  description: "",
  dateTranfer: null,
  attackFiles: [] 
}

const Post = (props) => {
  let history = useHistory();

  const [snackbar, setSnackbar] = useState({open:false, message:""});
  const [input, setInput]       = useState(initValues);
  const [error, setError]       = useState(initValues);

  const [onCreatePost, resultCreatePost] = useMutation(gqlCreatePost, {
    // variables: {
    //   taskId: 1,
    // },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  });

  const [onUpdatePost, resultUpdatePost] = useMutation(gqlUpdatePost, 
    {
      onCompleted({ data }) {
        history.push("/posts");
      }
    }
    // {
    // variables: {
    //   taskId: 1,
    // },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  // }
  );

  const updateCache = (cache, {data}) => {
    console.log("updateCache")
  };

  const resetInput = () => {
    console.log("updateCache")
  };

  console.log("resultUpdatePost :", resultUpdatePost)

  let { id, mode } = useParams();

  switch(mode){
    case "new":{
      editValues = undefined
      break;
    }
   
    case "edit":{
      editValues = useQuery(gqlPost, {
        variables: {id},
        notifyOnNetworkStatusChange: true,
      });

     
      if(_.isEqual(input, initValues)) {
        if(!_.isEmpty(editValues)){
          let {loading}  = editValues
          
          if(!loading){
            let {status, data} = editValues.data.Post

            console.log("edit editValues : ", data)
            if(status){
              setInput({
                title: data.title, 
                nameSubname: data.nameSubname, 
                idCard: data.idCard, 
                amount: data.amount,
                tels: data.tels,
                banks: data.banks,
                description: data.description,
                dateTranfer: data.dateTranfer,
                attackFiles: data.files
              })
            }
          }
        }
      }
      break;
    }
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "title": {
          if (!value) {
            stateObj[name] = "Please enter title.";
          }
          break;
        }

        case "nameSubname": {
          if (!value) {
            stateObj[name] = "Please enter name subname.";
          }
          break;
        }

        case "idCard": {
          if (!value) {
            stateObj[name] = "Please enter id card.";
          } 
          break;
        }

        case "amount": {
          if (!value) {
            stateObj[name] = "Please enter amount.";
          } 

          break;
        }

        default:
          break;
      }

      return stateObj;
    });
  };

  const submitForm = async(event) => {
    event.preventDefault();

    let oldAttackFiles = _.filter( input.attackFiles,  p => p.base64 )
    let newAttackFiles = _.filter( input.attackFiles,  p => !p.base64 )

    let newAttackFilesBase64 =  await Promise.all(newAttackFiles.map(convertFileToBase64)).then(base64Pictures =>{return base64Pictures});

    switch(mode){
      case "new":{
        onCreatePost({ variables: { input: {
            title: input.title,
            nameSubname: input.nameSubname,
            idCard: input.idCard,
            amount: input.amount,
            tels: input.tels,
            banks: _.omitDeep(input.banks, ['__typename']),
            description: input.description,
            dateTranfer: input.dateTranfer,
            files: [...newAttackFilesBase64, ...oldAttackFiles]
          }
        }});
        break;
      }
      case "edit":{

        let newInput = {
                      title: input.title,
                      nameSubname: input.nameSubname,
                      idCard: input.idCard,
                      amount: input.amount,
                      tels: input.tels,
                      banks: _.omitDeep(input.banks, ['__typename']),
                      description: input.description,
                      dateTranfer: input.dateTranfer,
                      files:  _.omitDeep(_.filter([...newAttackFilesBase64, ...oldAttackFiles], (v, key) => !v.delete), ['__typename', 'id'])
                    }

        console.log("newInput : ", newInput)

        onUpdatePost({ variables: { 
          id: editValues.data.Post.data.id,
          input: newInput
        }});
      }
    }
  };

  return (
    <div>
      {
        editValues != null && editValues.loading
        ? <div><CircularProgress /></div> 
        : <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" }
              }}
              onSubmit={submitForm}>
              <div>
                <TextField
                  id="post-title"
                  name="title"
                  label="Title"
                  variant="filled"
                  required
                  value={input.title}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  helperText={error.title}
                  error={_.isEmpty(error.title) ? false : true}
                />

                <TextField
                  id="post-name-subname"
                  name="nameSubname"
                  label="Name Subname"
                  variant="filled"
                  required
                  value={input.nameSubname}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  helperText={error.nameSubname}
                  error={_.isEmpty(error.nameSubname) ? false : true}
                />

                <TextField
                  id="post-idcard"
                  name="idCard"
                  label="ID Card"
                  variant="filled"
                  required
                  value={input.idCard}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  helperText={error.idCard}
                  error={_.isEmpty(error.idCard) ? false : true}
                />

                <TextField
                  id="post-amount"
                  name="amount"
                  label="Amount"
                  variant="filled"
                  type="number"
                  required
                  value={input.amount}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  helperText={error.amount}
                  error={_.isEmpty(error.amount) ? false : true}
                />

                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={ input.dateTranfer }
                  onChange={(newDate) => {
                    setInput({...input, dateTranfer: newDate})
                  }}
                  renderInput={(params) => <TextField {...params} required={input.dateTranfer === null ? true: false} />}
                />

                <TelInputField
                  values={input.tels}
                  onChange={(values) => {
                    console.log("Tel onChange >> :", values);
                    // setTels(values)
                    setInput({...input, tels: values})
                  }}
                />

                <BankInputField
                  values={input.banks}
                  onChange={(values) => {
                    console.log("Bank onChange >> :", values);

                    // setBanks(values)

                    setInput({...input, banks: values})
                  }}
                />

                <Editor 
                  label={"Description"} 
                  initData={ input.description }
                  onEditorChange={(newDescription)=>{
                    console.log("onEditorChange :", newDescription)

                    // setDescription(value)

                    setInput({...input, description: newDescription})
                  }} />

                <AttackFileField
                  values={input.attackFiles}
                  onChange={(values) => {
                    console.log("AttackFileField >> :", values);
                    // setAttackFiles(values)
                    setInput({...input, attackFiles: values})
                  }}
                  onSnackbar={(data) => {
                    setSnackbar(data);
                  }}
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </LocalizationProvider>
      }
     
      {snackbar.open && (
        <PopupSnackbar
          isOpen={snackbar.open}
          message={snackbar.message}
          onClose={() => {
            setSnackbar({...snackbar, open:false});
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Post;
