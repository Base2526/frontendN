import React, { useState, useEffect, withStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@apollo/client";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import _ from "lodash"

import { gqlBanks } from "../../gqlQuery"

const ItemBank = (props) => {
    let {item} = props 

    let valueBanks = useQuery(gqlBanks, { notifyOnNetworkStatusChange: true });
    
    if(valueBanks.loading){
        return <div />
    }

    let bank = _.find(valueBanks.data.banks.data, (v) => v.id === item.bankId)
    return <li><Typography variant="subtitle2" color="textSecondary">{item.bankAccountName} [{bank === null ? "" : bank.name}]</Typography></li>
};

export default ItemBank;
