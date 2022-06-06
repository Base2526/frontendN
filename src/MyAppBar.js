import React, { useEffect, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import classNames from "classnames";
import { NotificationsNone, Language, Settings, Comment as CommentIcon } from "@material-ui/icons";

import { Link, useHistory } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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

const MyAppBar = ({classes, onDrawerOpen, handleMenu, handleClose}) =>{

  let history = useHistory();

  return  <AppBar
            position="fixed"
            className={classes.appBar}
            fooJon={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon
                  classes={{
                    root: open
                      ? classes.menuButtonIconOpen
                      : classes.menuButtonIconClosed
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
                // noWrap
                onClick={(e)=>history.push("/")}
              >
                BANLIST.INFO
              </Typography>
              <TopRight>
              <Link to="/notification">
                <IconContainer >
                  <NotificationsNone />
                  <TopIconBadge>2</TopIconBadge>
                </IconContainer>
                </Link>
                <Link to="/messenger">
                  <IconContainer>
                    <CommentIcon />
                    <TopIconBadge>2</TopIconBadge>
                  </IconContainer>
                </Link>
                <IconContainer>
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </IconContainer>
                <Menu
                  id="menu-appbar"
                  // anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  // open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </TopRight>
            </Toolbar>
          </AppBar>
}

export default MyAppBar;