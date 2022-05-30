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
import Home from "./pages/home2/Home";
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Store from "./Store";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import PostList from "./pages/postList/PostList";
import Post from "./pages/post/Post";

import CommentList from "./pages/commentList/CommentList";
import Comment from "./pages/comment/Comment";

import SocketList from "./pages/socketList/SocketList";
import Socket from "./pages/socket/Socket";

import BankList from "./pages/bankList/BankList";
import Bank from "./pages/bank/Bank";

import RoleList from "./pages/roleList/RoleList";
import Role from "./pages/role/Role";

import Devel from "./pages/devel/Devel";

import Notification from "./pages/notification"
import Messenger from "./pages/messenger"

// ThemeMailList
import ThemeMailList from "./pages/themeMailList/ThemeMailList";
import ThemeMail from "./pages/themeMail/ThemeMail";

import _ from "lodash";
import { MenuList } from "./menu";
import CustomizedListItem from "./CustomizedListItem";

// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import HomeIcon from "@mui/icons-material/Home";
// import WhatshotIcon from "@mui/icons-material/Whatshot";
// import GrainIcon from "@mui/icons-material/Grain";

import Breadcs from "./components/breadcrumbs/Breadcs";

import { NotificationsNone, Language, Settings, Comment as CommentIcon } from "@material-ui/icons";
import styled from "styled-components";

// import CommentIcon from '@mui/icons-material/Comment';
import { socket } from "./SocketioClient";

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
export const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #eee;
`;

export const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#fafafa"
//     },
//     secondary: purple
//   },
//   typography: {
//     fontFamily: "Quicksand",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700
//   }
// });

const App = (props) => {
  const navigate = useHistory();
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(async () => {
    // let socket = await socket({});
    // console.log("socket : ", socket)
  }, [])

  const handleDrawerOpen = () => {
    // this.setState({ open: !this.state.open });
    setOpen(!open)
  };

  const handleDrawerClose = () => {
    // this.setState({ open: false });
    setOpen(false)
  };

  const handleMenu = (event) => {
    // this.setState({ anchorEl: event.currentTarget });
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    // this.setState({ anchorEl: null });
    setAnchorEl(null)
  };

  const handleText = () => {
    console.log("handleText");
  };

  return (
    <Router>
      <Store>
        <div className={props.classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={props.classes.appBar}
            fooJon={classNames(props.classes.appBar, {
              [props.classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={props.classes.menuButton}
              >
                <MenuIcon
                  classes={{
                    root: open
                      ? props.classes.menuButtonIconOpen
                      : props.classes.menuButtonIconClosed
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={props.classes.grow}
                noWrap
              >
                BANLIST
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
                  anchorEl={anchorEl}
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
            open={open}
          >
            <div className={props.classes.toolbar} />
            {/* <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider /> */}
            <List>
              {/* {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
              {MenuList.map((doc) => {
                return <CustomizedListItem key={doc.id} doc={doc} />;
              })}
            </List>
          </Drawer>
          <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            <Breadcs title={""} />
            {/* <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio
              morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in.
              In hendrerit gravida rutrum quisque non tellus orci ac.
              Pellentesque nec nam aliquam sem et tortor. Habitant morbi
              tristique senectus et. Adipiscing elit duis tristique
              sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis.
              Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
            <Typography paragraph>foo</Typography> */}
            <div className="container">
              {/* <Sidebar /> */}
              <Switch>
                <Route path="/" exact>
                  <Home handleText={handleText} />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:id/:mode">
                  <User />
                </Route>
                <Route path="/user/:mode">
                  <User />
                </Route>

                {/* <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:id">
                  <Product />
                </Route>
                <Route path="/newProduct">
                  <NewProduct />
                </Route> */}

                <Route path="/posts">
                  <PostList />
                </Route>
                <Route path="/post/:mode">
                  <Post />
                </Route>
                <Route path="/post/:id/:mode">
                  <Post />
                </Route>

                {/* comments */}
                <Route path="/comments">
                  <CommentList />
                </Route>
                <Route path="/comment/:id/:mode">
                  <Comment />
                </Route>
                <Route path="/comment/:mode">
                  <Comment />
                </Route>

                {/* sockets */}
                <Route path="/sockets">
                  <SocketList />
                </Route>
                <Route path="/socket/:id">
                  <Socket />
                </Route>
                {/* <Route path="/newSocket">
                  <NewSocket />
                </Route> */}

                {/* devel */}
                <Route path="/devel">
                  <Devel />
                </Route>

                {/* roles */}
                <Route path="/roles">
                  <RoleList />
                </Route>
                <Route path="/role/:id/:mode">
                  <Role />
                </Route>
                <Route path="/role/:mode">
                  <Role />
                </Route>

                {/* banks */}
                <Route path="/banks">
                  <BankList />
                </Route>
                <Route path="/bank/:id/:mode">
                  <Bank />
                </Route>
                <Route path="/bank/:mode">
                  <Bank />
                </Route>

                {/* theme mail */}
                <Route path="/theme-mails">
                  <ThemeMailList />
                </Route>
                <Route path="/theme-mail/:id/:mode">
                  <ThemeMail />
                </Route>
                <Route path="/theme-mail/:mode">
                  <ThemeMail />
                </Route>

                <Route path="/notification">
                  <Notification />
                </Route>

                <Route path="/messenger">
                  <Messenger />
                </Route>
                {/* Notification */}
              </Switch>
            </div>
          </main>
        </div>
      </Store>
    </Router>
  );
}

// App.propTypes = {
//   props.classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

export default withStyles(styles, { withTheme: true })(App);
