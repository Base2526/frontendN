import React, { useEffect } from "react";

import _ from "lodash"
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { useQuery, useMutation } from "@apollo/client";

import { gqlUser } from "../../gqlQuery"

let unsubscribe =  null
const ItemList = (props) => {
  let {value} = props 

  let userValues = useQuery(gqlUser, {
    variables: {id: value.user_who_fired_event},
    notifyOnNetworkStatusChange: true,
  });

  console.log("onListItem :", userValues, props)

  if(userValues.loading) return <div />

  let { displayName, image } = userValues.data.user.data
  return  <ListItemButton onClick={e=>{ 
              let {input} = value
              props.history.push("/detail/" + input.postId);
            }}>
            <ListItemAvatar>
              <Avatar alt={displayName} src={_.isEmpty(image) ? "" : image[0].base64} />
            </ListItemAvatar>
            <ListItemText
              primary={displayName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary">{value.type}</Typography>
                  {"  "}{value.text}
                </React.Fragment>
              }
            />
          </ListItemButton>
};

export default ItemList;