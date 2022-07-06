import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import Divider from '@mui/material/Divider';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const CustomizedListItem = ({item}) => {
  let history = useHistory();
  let [state, setState] = useState(false);

  const handleClick = (path) => {
    setState(!state);
    history.push(path);
  };

  return (
    <div key={item.Id}>
      <ListItem
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
      </ListItem>
      {item.Sheets && (
        <Collapse key={item.Sheets.Id} in={state} timeout="auto" unmountOnExit>
          <List component="li" disablePadding key={item.Id}>
            {item.Sheets.map((sheet, key) => {
              return (
                <ListItem
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
                </ListItem>
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
