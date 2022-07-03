import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import _ from "lodash"

import {  MenuAdministrator,
          MenuAuthenticated,
          MenuAnonymous
        } from "./MenuList";
import CustomizedListItem from "./CustomizedListItem";
import { getPermissions } from "./AuthProvider"

const LeftMenu = (props) => {
  useEffect(async()=>{
  }, [])

  const menuL = () =>{
    let permissions = getPermissions()

    console.log("permissions :", permissions)

    let listMenu = MenuAnonymous
    if( permissions && permissions.includes("authenticated")){
      listMenu = MenuAuthenticated
    }
    if( permissions && permissions.includes("administrator")){
      listMenu = MenuAdministrator
    }
    return  _.map(listMenu, (item)=> { return <CustomizedListItem key={item.id} item={item} /> })
  }

  return (
    <List>
      {menuL()}
    </List>
  )
};

export default LeftMenu;
