import React, { useState, useEffect, withStyles } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import _ from "lodash"
import { gqlPostsByUserId } from "../../gqlQuery"

const UserPostList = (props) => {
    let {id} = props

    console.log("UserPostList :", props)

    const postsByUserId = useQuery(gqlPostsByUserId, {
        variables: { userId: id },
        notifyOnNetworkStatusChange: true,
    });
    console.log("postsByUserId :", postsByUserId)

    return (
        <>
        {
            postsByUserId.loading
            ?   <div><CircularProgress /></div> 
            :   <div>
                    <>Post {postsByUserId.data.postsByUserId.data.length}</> 
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {
                            _.map(postsByUserId.data.postsByUserId.data, (item)=>{
                                return  <div key={item.id}>
                                            <CardHeader
                                                action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                                }
                                                subheader={moment(item.createdAt).format('MMMM Do YYYY')}/>
                                            <CardContent>
                                                <div style={{ position: "relative", paddingBottom: "10px" }}>
                                                    <Avatar
                                                        sx={{ width: 100, height: 100 }}
                                                        variant="rounded"
                                                        alt="Remy Sharp"
                                                        src={item.files.length < 1 ? "" : item.files[0].base64}
                                                    />
                                                    {item.files.length > 1 
                                                    ? <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "15px",
                                                            // right: "5px",
                                                            padding: "5px",
                                                            backgroundColor: "#e1dede",
                                                            borderRadius: "5px",
                                                            margin: "5px",
                                                            color: "#919191"
                                                        }}
                                                        >{item.files.length}</div>
                                                    : <div />}
                                                </div>
                                                <React.Fragment>
                                                    <Typography
                                                    sx={{ display: "inline" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                    >
                                                    รายละเอียด :
                                                    </Typography>
                                                    { item.description }
                                                </React.Fragment>
                                            </CardContent>

                                            <div>
                                                <Typography>Footer Text</Typography>
                                            </div>
                                            <Divider />
                                        </div>
                            })
                        }
                    </List>
                </div>
        } 
        </>
        
    );
};

export default UserPostList;
