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
import CircularProgress from '@mui/material/CircularProgress';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import _ from "lodash"
import moment from "moment";

import { gqlUser } from "../../gqlQuery"

const ItemHeader = (props) => {
    let history = useHistory();

    let { index, item, onAnchorElSettingOpen} = props 
    
    let userValue = useQuery(gqlUser, {
        variables: {id: item.ownerId},
        notifyOnNetworkStatusChange: true,
    });


    if( ! userValue.loading){
        if(userValue.data.User.data == null){
            return <div />
        }

        return  <CardHeader
                    avatar={<Avatar 
                            className={"card-header-title"} 
                            src={userValue.data.User.data.image[0].base64}
                            onClick={(e)=> history.push("/user/" + userValue.data.User.data.id +"/view") }  />}
                    action={
                    <IconButton  onClick={(e) => {
                        onAnchorElSettingOpen(index, e);
                    }}>
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={ <Typography className={"card-header-title"} onClick={(e)=>{
                        history.push("/user/" + userValue.data.User.data.id +"/view");
                    }} 
                    variant="subtitle2" gutterBottom component="div">{userValue.data.User.data.displayName}</Typography> }
                    subheader={moment(item.createdAt).format('MMMM Do YYYY')}
                />
    }

    return <CircularProgress />
};

export default ItemHeader;