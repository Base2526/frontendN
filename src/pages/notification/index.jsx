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

import { login } from "../../redux/actions/auth"

const index =(props)=> {
  let {user} = props

  const [anchorElSetting, setAnchorElSetting] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, key) => {
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
                    }
                    >
                    <ListItemButton 
                    onClick={e=>{
                      console.log("ListItem")
                    }}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {menuL(value, key)}
                </div>
      })
      }
    </List>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = {
  login
}

export default connect( mapStateToProps, mapDispatchToProps )(index);
