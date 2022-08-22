import "./styles.css";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
  useLocation
} from "react-router-dom";
import styled from "styled-components";

import Store from "./Store";
import Detail from "./pages/detail/Detail"
import _ from "lodash";

import { useQuery } from "@apollo/client";

import Breadcs from "./components/breadcrumbs/Breadcs";
import Home from "./pages/home/Home";
// import { socket } from "./SocketioClient";

import MyAppBar from "./MyAppBar";
import LeftMenu from "./LeftMenu"

import PrivateRoute from "./PrivateRoute"
import PrivatePage from "./PrivatePage"
import UserView from "./pages/user/UserView";
import DialogLogin from "./DialogLogin";

import Help from "./pages/help"

import { login, addedConversations, addedConversation, addedNotifications, addedNotification } from "./redux/actions/auth"

import { gqlConversations, gqlBookmarksByUserId, subConversation, subBookmark, gqlNotifications, subNotification } from "./gqlQuery"

let unsubscribeConversation = null;
let unsubscribeNotification = null;

const drawerWidth = 220;

const styles = (theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  }
});

const App = (props) => {
  let {is_connnecting, user, addedConversations, addedConversation, addedNotifications, addedNotification} = props

  const history = useHistory();
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const [dialogLoginOpen, setDialogLoginOpen] = useState(false);

  ////////////////////// conversation ////////////////////////////
  const conversationValues =useQuery(gqlConversations, { variables: { userId: ""}, notifyOnNetworkStatusChange: true });

  // console.log("conversationValues :", conversationValues )

  if(  is_connnecting && !conversationValues.loading && conversationValues.data.conversations){
    let { status, data } = conversationValues.data.conversations  
    addedConversations(data)
  
    let {subscribeToMore} = conversationValues
    unsubscribeConversation = subscribeToMore({
      document: subConversation,
      variables: { userId: user.id },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) return prev;

        let { subConversation } = subscriptionData.data;
        addedConversation(subConversation)

        return prev;
      }
    });
  }

  ////////////////////// conversation ////////////////////////////

  //////////////////////  notifications //////////////////////////////////
  const notificationValues =useQuery(gqlNotifications, { variables: { userId: ""}, notifyOnNetworkStatusChange: true });

  // console.log("notificationValues :", notificationValues )

  if(  is_connnecting && !notificationValues.loading && notificationValues.data.notifications ){
    
    let { status, data } = notificationValues.data.notifications  
    addedNotifications(data)
  
    let {subscribeToMore} = notificationValues
    unsubscribeNotification = subscribeToMore({
      document: subNotification,
      variables: { userId: user.id },
      updateQuery: (prev, {subscriptionData}) => {

           
        if (!subscriptionData.data) return prev;

        let { subNotification } = subscriptionData.data;
        addedNotification(subNotification)
        console.log("addedNotification : ", subNotification)     

        return prev;
      }
    });
  }
  //////////////////////  notifications //////////////////////////////////

  const [onlineIndicator, setOnlineIndicator] = useState(0);
  const worker = () => {
    console.log("worker :", new Date().toISOString())
  }

  useEffect(async () => {
    worker()

    setOnlineIndicator(setInterval(() => worker(), 20000));

    return () => {
      // Clean up
      clearInterval(onlineIndicator);

      unsubscribeConversation && unsubscribeConversation()

      unsubscribeNotification && unsubscribeNotification()
    };
  }, [])

  useEffect(()=>{
    conversationValues.refetch({userId: _.isEmpty(user) ? "" : user.id})

    notificationValues.refetch({userId: _.isEmpty(user) ? "" : user.id})
  }, [user])

  const handleDrawerOpen = () => {
    setOpen(!open)
  };

  const NoMatch = () =>{
    let location = useLocation();

    return (
      <div>
        <h3>
          Page not found !!! <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }

  return (
    <Router>
      <Store>
        <div className={props.classes.root}>
          <CssBaseline />
          <MyAppBar 
            classes={props.classes} 
            onDrawerOpen={
              handleDrawerOpen
            }
            handleMenu={(e)=>{
              console.log("handleMenu")
            }}
            handleClose={(e)=>{
              
            }}
            onDialogLogin={(status)=>{
              setDialogLoginOpen(status)
            }}
          />
          <Drawer
            variant="permanent"
            className={classNames(props.classes.drawer, {
              [props.classes.drawerOpen]: open,
              [props.classes.drawerClose]: !open
            })}
            classes={{
              paper: classNames({
                [props.classes.drawerOpen]: open,
                [props.classes.drawerClose]: !open
              })
            }}
            open={open}>
            <div className={props.classes.toolbar} />
            <LeftMenu  {...props}/>
          </Drawer>
          <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            <Breadcs title={""} />
            <div className="container">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/detail/:id">
                  <Detail/>
                </Route>
                <Route path="/user/:id/view">
                  <UserView />
                </Route>
                <Route path="/help">
                  <Help />
                </Route>
                <PrivateRoute path="/">
                  <PrivatePage />
                </PrivateRoute>   
                <Route path="*">
                  <NoMatch />
                </Route>     
              </Switch>
            </div>
          </main>
        </div>

        {
          dialogLoginOpen &&  
          <DialogLogin
            {...props}
            open={dialogLoginOpen}
            onComplete={(data)=>{
              console.log("onComplete :", data)

              // props.login(data)
              setDialogLoginOpen(false);

            }}
            onClose={() => {

              console.log(">>>> ")
              setDialogLoginOpen(false);

              // DialogLogin
              // history.push("/")
            }}
          />
        }
      </Store>
    </Router>
  );
}

// export default withStyles(styles, { withTheme: true })(App);

const mapStateToProps = (state, ownProps) => {
  // console.log("mapStateToProps :", state)
  return {
    user: state.auth.user,
    is_connnecting: state.ws.is_connnecting
  }
};

const mapDispatchToProps = {
  login,
  addedConversations,
  addedConversation,

  addedNotifications, 
  addedNotification
}

export default compose(
                        connect(
                          mapStateToProps,
                          mapDispatchToProps, // or put null here if you do not have actions to dispatch
                        ),
                        withStyles(styles , { withTheme: true }),
                      )(App);