import axios from "axios";
import { useEffect, useState } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faCheckSquare,
  faUserPlus,
  faCommentAlt,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./conversation.css";

export default function Conversation(props) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    console.log("Conversation >>", props.profile);
  }, []);

  //   useEffect(() => {
  //     const friendId = conversation.members.find((m) => m !== currentUser._id);

  //     const getUser = async () => {
  //       try {
  //         const res = await axios("/users?userId=" + friendId);
  //         setUser(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getUser();
  //   }, [currentUser, conversation]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = () => {
    return (
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => {}}>Copy link</MenuItem>
        <MenuItem onClick={() => {}}>Report</MenuItem>
      </Menu>
    );
  };

  return (
    <div>
      <div>
        <img
          className="conversationImg"
          src={props.profile.url}
          alt=""
        />
      </div>
      <div>
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleClick(e)}
          className="m-1"
        />
      </div>
      <div
        onClick={(e) => {
          props.onClick(e);
        }}
      >
        <div className="">{props.profile.display_name}</div>
        <div className="">message</div>
        <div className="">is online</div>
      </div>
      <div>{menu()}</div>
    </div>
  );
}
