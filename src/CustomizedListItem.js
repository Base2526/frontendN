import React, { useState, useEffect } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import Divider from '@mui/material/Divider';
import { useLocation, useHistory } from "react-router-dom";

const CustomizedListItem = (props) => {
  let location = useLocation();
  let history = useHistory();
  let [state, setState] = useState(false);

  let {item} = props
 
  const handleClick = (path) => {
    setState(!state);
    history.push(path);
  };

  return (
    <div key={item.Id}>
      <ListItemButton
        selected={location.pathname === item.Path ? true : false}
        button
        key={item.Id}
        onClick={() => {
          handleClick(item.Path);
        }}
      >
        <ListItemIcon>
          {item.Icon}
        </ListItemIcon>
        <ListItemText primary={item.Name} />
        {item.Sheets && (state ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {item.Sheets && (
        <Collapse key={item.Sheets.Id} in={state} timeout="auto" unmountOnExit>
          <List component="li" disablePadding key={item.Id}>
            {item.Sheets.map((sheet, key) => {
              return (
                <ListItemButton
                  button
                  key={key}
                  onClick={() => {
                    history.push(sheet.Path);
                  }}
                >
                  <ListItemIcon>
                    {sheet.Icon}
                  </ListItemIcon>
                  <ListItemText key={sheet.Id} primary={sheet.Title} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
      <Divider />
    </div>
  );
};

export default CustomizedListItem;
