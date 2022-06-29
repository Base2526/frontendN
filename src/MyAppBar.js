import React, { useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import classNames from "classnames";
import Button from "@mui/material/Button";
import { NotificationsNone, Language, Settings, Comment as CommentIcon } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { isAuth } from "./AuthProvider"

export const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #eee;
`;

export const TopIconBadge = styled.span`
  position: absolute;
  top: -5px;
  right: 1px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const MyAppBar = ({classes, onDrawerOpen, onDialogLogin}) =>{
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () =>{
    setAnchorEl(null)
  }

  return  <AppBar
            position="fixed"
            className={classes.appBar}
            fooJon={classNames(classes.appBar, {
              [classes.appBarShift]: Boolean(anchorEl)
            })}>
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon
                  classes={{
                    root: Boolean(anchorEl)
                      ? classes.menuButtonIconOpen
                      : classes.menuButtonIconClosed
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
                onClick={(e)=>history.push("/")}>
                BANLIST.INFO
              </Typography>
              {
                isAuth()
                ? <TopRight>
                    <Link to="/notification">
                      <IconContainer >
                        <NotificationsNone />
                        <TopIconBadge>2</TopIconBadge>
                      </IconContainer>
                    </Link>
                    <Link to="/message">
                      <IconContainer>
                        <CommentIcon />
                        <TopIconBadge>2</TopIconBadge>
                      </IconContainer>
                    </Link>
                    <IconContainer>
                      <IconButton
                        aria-owns={Boolean(anchorEl) ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={(event)=>{
                          setAnchorEl(event.currentTarget)
                        }}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={()=>{
                          history.push("/profile")
                          handleClose()
                        }}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                      </Menu>
                    </IconContainer>
                   
                  </TopRight>
                : <Button 
                    style={{marginRight:"10px"}} 
                    variant="contained" 
                    color="primary"
                    onClick={(e)=>{
                      onDialogLogin(true)
                    }}>Login</Button>
              }
            </Toolbar>
          </AppBar>
}

export default MyAppBar;