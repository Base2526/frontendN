import "./styles.css";

import React, { useState, useEffect } from "react";
import { Redirect, Link, Switch, Route, useRouteMatch } from "react-router-dom";

import BankList from "./pages/bankList/BankList";
import Bank from "./pages/bank/Bank";
import RoleList from "./pages/roleList/RoleList";
import Role from "./pages/role/Role";
import Devel from "./pages/devel/Devel";
import Notification from "./pages/notification"
import Message from "./pages/message/MessageView"
import BookmarkList from "./pages/bookmarkList/BookmarkList"
import ContactUsList from "./pages/contactUsList/ContactUsList"
import TContactUs from "./pages/taxonomy/tContactUs/TContactUs"
import TContactUsList from "./pages/taxonomy/tContactUsList/TContactUsList"
import ThemeMailList from "./pages/themeMailList/ThemeMailList";
import ThemeMail from "./pages/themeMail/ThemeMail";
import ShareList from "./pages/shareList/ShareList"
import DblogList from "./pages/dblogList/DblogList"
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import PostList from "./pages/postList/PostList";
import Post from "./pages/post/Post";
import CommentList from "./pages/commentList/CommentList";
import Comment from "./pages/comment/Comment";
import SocketList from "./pages/socketList/SocketList";
import Socket from "./pages/socket/Socket";

import UserList from "./pages/userList/UserList";
import UserNew from "./pages/user/UserNew";
import UserEdit from "./pages/user/UserEdit";

import BasicContentList from "./pages/basicContentList/BasicContentList"
import BasicContent from "./pages/basicContent/BasicContent"

import Profile from "./pages/profile"

// import { isAuth } from "./AuthProvider";
import { connect } from "react-redux";
import _ from "lodash"

const PrivatePage =(props) => {
  let { path, url } = useRouteMatch();
//   console.log("path :", path);


  return !_.isEmpty(props.user)
        ?   <Switch>
                <Route path="/me">
                    <Profile />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/user/:id/edit">
                    <UserEdit />
                </Route>
                <Route path="/user/new"> 
                    <UserNew />
                </Route>
                <Route path="/posts">
                    <PostList />
                </Route>
                <Route path="/post/:id/:mode">
                    <Post />
                </Route>
                <Route path="/post/:mode">
                    <Post />
                </Route>
                <Route path="/comments">
                    <CommentList />
                </Route>
                <Route path="/comment/:id/:mode">
                    <Comment />
                </Route>
                <Route path="/comment/:mode">
                    <Comment />
                </Route>
                <Route path="/sockets">
                    <SocketList />
                </Route>
                <Route path="/socket/:id">
                    <Socket />
                </Route>
                <Route path="/devel">
                    <Devel />
                </Route>
                <Route path="/roles">
                    <RoleList />
                </Route>
                <Route path="/role/:id/:mode">
                    <Role />
                </Route>
                <Route path="/role/:mode">
                    <Role />
                </Route>
                <Route path="/banks">
                    <BankList />
                </Route>
                <Route path="/bank/:id/:mode">
                    <Bank />
                </Route>
                <Route path="/bank/:mode">
                    <Bank />
                </Route>
                <Route path="/theme-mails">
                    <ThemeMailList />
                </Route>
                <Route path="/theme-mail/:id/:mode">
                    <ThemeMail />
                </Route>
                <Route path="/theme-mail/:mode">
                    <ThemeMail />
                </Route>
                <Route path="/tcontactus-list">
                    <TContactUsList />
                </Route>
                <Route path="/tcontactus/:id/:mode">
                    <TContactUs />
                </Route>
                <Route path="/tcontactus/:mode">
                    <TContactUs />
                </Route>
                <Route path="/notification">
                    <Notification />
                </Route>
                <Route path="/message">
                    <Message />
                </Route>
                <Route path="/bookmarks">
                    <BookmarkList />
                </Route>
                <Route path="/contact-us">
                    <ContactUsList />
                </Route>
                <Route path="/shares">
                    <ShareList />
                </Route>
                <Route path="/dblog">
                    <DblogList />
                </Route>
                <Route path="/basic-contents">
                    <BasicContentList />
                </Route>
                <Route path="/basic-content/:id/:mode">
                    <BasicContent />
                </Route>
                <Route path="/basic-content/:mode">
                    <BasicContent />
                </Route>
            </Switch>
        :   <Redirect to="/" />
  
}

// export default PrivatePage;
const mapStateToProps = (state, ownProps) => {
    // console.log("mapStateToProps  :", state)
    return {
      user: state.auth.user,
    }
};

export default connect( mapStateToProps, null )(PrivatePage);
