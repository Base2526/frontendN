import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash"
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/auth"

import ItemList from "./ItemList"

const index =(props)=> {

  let history = useHistory();

  let {user, notifications} = props

  const [anchorElSetting, setAnchorElSetting] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(()=>{
    console.log("notifications :", notifications)
  }, [notifications])

  const handleClose = () =>{
    setAnchorElSetting(null)
  }

  const menuL = (item, index) =>{
    return  <Menu
              anchorEl={anchorElSetting && anchorElSetting[index]}
              keepMounted
              open={anchorElSetting && Boolean(anchorElSetting[index])}
              onClose={()=>{
                handleClose()
              }}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox"
              }}
            >
              <MenuItem onClick={(e)=>{
                handleClose()
              }}>
                Close
              </MenuItem>
            </Menu>
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper'  }} disablePadding>
      {
        _.map(notifications, (value, key)=>{
          return  <div key={key}>
                    <ListItem 
                      alignItems="flex-start" 
                      disablePadding
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments" onClick={(e)=>{
                          setAnchorElSetting({ [key]: e.currentTarget });
                        }}>
                          <MoreVertIcon />
                        </IconButton>
                      }>
                      <ItemList {...props} history={history} value={value} />
                      </ListItem>
                      {menuL(value, key)}
                  </div>
        })
      }
    </List>
  );
}

const mapStateToProps = (state, ownProps) => {
  let notifications = _.orderBy(state.auth.notifications, (o) => { return moment(o.createdAt); }, ['desc']);
  return {
    user: state.auth.user,
    notifications
  }
};

const mapDispatchToProps = {
  login
}

export default connect( mapStateToProps, mapDispatchToProps )(index);
