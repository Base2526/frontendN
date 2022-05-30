import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import React , { useContext, useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
import axios from "axios";
import Identicon from "identicon.js";
import { loremIpsum } from "lorem-ipsum";
import ls from "local-storage";
// import FaMenu from "react-icons/lib/md/more-vert";
// import FaSquare from "react-icons/lib/md/crop-square";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CropIcon from '@mui/icons-material/Crop';

import {
  Button,
  Input,
  MessageBox,
  MessageList,
  Dropdown,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faCamera,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

// import { toBase64 } from "../../utils";
// import history from "../../history";
// import { addConversations } from "../../actions/user";
// import { addMessages, addMessage } from "../../actions/messages";

var _ = require("lodash");

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const index = (props) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef(null);
  let scrollList = useRef();

  let _fileUploadButton = useRef(null);

  const inputRef = useRef(null);

  const [loadingMessage, setLoadingMessage] = useState(false);

  useEffect(async () => {
    if (_.isEmpty(props.user)) {
      // history.push({ pathname: `/`, state: {} });
      return;
    }

    let response = await axios.post(
      `/v1/conversation`,
      {},
      {
        headers: {
          Authorization: _.isEmpty(ls.get("basic_auth"))
            ? `Basic ${process.env.REACT_APP_AUTHORIZATION}`
            : ls.get("basic_auth"),
        },
      }
    );

    response = response.data;
    if (response.result) {
      console.log("MessengerPage, response:", response);

      let { data } = response;
      // setConversations(data);

      // props.addConversations(data);

      // if (!_.isEmpty(response.data)) {
      //   setCurrentChat(response.data[0]);

      //   setLoadingMessage(true);
      // }
    }

    // var arr = [];
    // for (var i = 0; i < 2; i++) arr.push(i);
    // var chatSource = arr.map((x) => random("chat"));
    // setMessageList(chatSource);
  }, []);

  useEffect(() => {
    // if (!_.isEmpty(currentChat)) {
    //   // conversationId
    //   let filter_messages = _.filter(props.messages, (e) => {
    //     return e.conversationId === currentChat._id;
    //   });
    //   console.log(
    //     "props.messages >>> ",
    //     props.messages,
    //     currentChat,
    //     filter_messages
    //   );

    //   setMessageList(filter_messages);
    // }

    // console.log("props.converstions >>> ", props.converstions);

    setConversations(props.converstions);
  }, [props.converstions]);

  useEffect(() => {
    if (!_.isEmpty(currentChat)) {
      // conversationId
      let filter_messages = _.filter(props.messages, (e) => {
        return e.conversationId === currentChat._id;
      });

      // let myArray = _.sortBy(
      //   filter_messages,
      //   (dateObj) => new Date(dateObj.createdAt)
      // );

      console.log(
        "props.messages >>> ",
        props.messages,
        currentChat,
        filter_messages
        // myArray
      );

      setMessageList(
        _.sortBy(filter_messages, (dateObj) => new Date(dateObj.createdAt))
      );
    }
  }, [props.messages]);

  // useEffect(() => {
  //   //
  //   console.log("converstions : ", props.converstions);
  // }, [props.converstions]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get("/conversations/" + user._id);
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [user._id]);

  useEffect(async () => {
    // const getMessages = async () => {
    try {
      let response = await axios.get("/v1/get_message/" + currentChat?._id);
      //

      response = response.data;

      console.log("MessengerPage > currentChat #:", response);
      if (response.result) {
        let data = response.data;

        // setMessages(data);
        // setMessageList(data);

        if (!_.isEmpty(currentChat)) {
          // conversationId
          let filter_messages = _.filter(data, (e) => {
            return e.conversationId === currentChat._id;
          });
          // console.log(">>> ", props.messages, currentChat, filter_messages);

          // setMessageList(filter_messages);

          // props.addMessages(filter_messages);
        }
      }

      setLoadingMessage(false);
    } catch (err) {
      console.log(err);
    }
    // };
    // getMessages();

    console.log("currentChat: ", currentChat);
  }, [currentChat]);

  // useEffect(() => {
  //   scrollList.scrollTop = scrollList.scrollHeight;

  //   console.log("messageList : ", messageList);
  // }, [messageList]);

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const token = () => {
    return parseInt((Math.random() * 10) % 8);
  };

  const photo = (size) => {
    return new Identicon(String(Math.random()) + String(Math.random()), {
      margin: 0,
      size: size || 20,
    }).toString();
  };

  // waiting, sent, received, read, error
  const random = (type, mtype) => {
    switch (type) {
      case "message":
        mtype = mtype || token();
        var status = "waiting";
        switch (mtype) {
          case 0:
            mtype = "photo";
            status = "sent";
            break;
          case 1:
            mtype = "file";
            status = "sent";
            break;
          case 2:
            mtype = "system";
            status = "received";
            break;
          case 3:
            mtype = "location";
            break;
          case 4:
            mtype = "spotify";
            break;
          case 5:
            mtype = "meeting";
            break;
          case 6:
            mtype = "video";
            status = "sent";
            break;
          case 7:
            mtype = "audio";
            break;
          default:
            mtype = "text";
            status = "read";
            break;
        }

        return {
          position: token() >= 1 ? "right" : "left",
          // forwarded: true,
          // replyButton: true,
          // removeButton: true,
          // retracted: false,
          // reply:
          //   token() >= 1
          //     ? {
          //         photoURL:
          //           token() >= 1 ? `data:image/png;base64,${photo(150)}` : null,
          //         title: loremIpsum({ count: 2, units: "words" }),
          //         titleColor: getRandomColor(),
          //         message: loremIpsum({ count: 1, units: "sentences" }),
          //       }
          //     : null,
          meeting:
            token() >= 1
              ? {
                  subject: loremIpsum({ count: 2, units: "words" }),
                  title: loremIpsum({ count: 2, units: "words" }),
                  date: +new Date(),
                  collapseTitle: loremIpsum({ count: 2, units: "words" }),
                  participants: Array(token() + 6)
                    .fill(1)
                    .map((x) => ({
                      id: parseInt((Math.random() * 10) % 7),
                      title: loremIpsum({ count: 1, units: "words" }),
                    })),
                  dataSource: Array(token() + 5)
                    .fill(1)
                    .map((x) => ({
                      id: String(Math.random()),
                      avatar: `data:image/png;base64,${photo()}`,
                      message: loremIpsum({ count: 1, units: "sentences" }),
                      title: loremIpsum({ count: 2, units: "words" }),
                      avatarFlexible: true,
                      date: +new Date(),
                      event: {
                        title: loremIpsum({ count: 2, units: "words" }),
                        avatars: Array(token() + 2)
                          .fill(1)
                          .map((x) => ({
                            src: `data:image/png;base64,${photo()}`,
                            title: "react, rce",
                          })),
                        avatarsLimit: 5,
                      },
                      record: {
                        avatar: `data:image/png;base64,${photo()}`,
                        title: loremIpsum({ count: 1, units: "words" }),
                        savedBy:
                          "Kaydeden: " +
                          loremIpsum({ count: 2, units: "words" }),
                        time: new Date().toLocaleString(),
                      },
                    })),
                }
              : null,
          type: mtype,
          theme: "black",
          view: "list",
          // title: loremIpsum({ count: 2, units: "words" }),
          title: props.user.display_name,
          titleColor: getRandomColor(),
          text:
            mtype === "spotify"
              ? "spotify:track:0QjjaCaXE45mvhCnV3C0TA"
              : loremIpsum({ count: 1, units: "sentences" }),
          data: {
            videoURL:
              token() >= 1
                ? "https://www.w3schools.com/html/mov_bbb.mp4"
                : "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
            audioURL: "https://www.w3schools.com/html/horse.mp3",
            uri: `data:image/png;base64,${photo(150)}`,
            status: {
              click: true,
              loading: 0.5,
              download: mtype === "video",
            },
            size: "100MB",
            width: 300,
            height: 300,
            latitude: "37.773972",
            longitude: "-122.431297",
            staticURL:
              "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY",
          },
          onLoad: () => {
            console.log("Photo loaded");
          },
          status: status,
          date: +new Date(),
          onReplyMessageClick: () => {
            console.log("onReplyMessageClick");
          },
          onRemoveMessageClick: () => {
            console.log("onRemoveMessageClick");
          },
          avatar: `data:image/png;base64,${photo()}`,
          id: String(Math.random()),
        };
      case "chat":
        return {
          id: String(Math.random()),
          avatar: `data:image/png;base64,${photo()}`,
          avatarFlexible: true,
          statusColor: "lightgreen",
          statusColorType:
            parseInt((Math.random() * 100) % 2) === 1 ? "encircle" : undefined,
          alt: loremIpsum({ count: 2, units: "words" }),
          title: loremIpsum({ count: 2, units: "words" }),
          date: new Date(),
          subtitle: loremIpsum({ count: 1, units: "sentences" }),
          unread: parseInt((Math.random() * 10) % 3),
          muted: parseInt((Math.random() * 10) % 2) === 1,
          showMute: parseInt((Math.random() * 10) % 2) === 1,
          showVideoCall: parseInt((Math.random() * 10) % 2) === 1,
          dropdownMenu: (
            <Dropdown
              animationPosition="norteast"
              title="Dropdown Title"
              buttonProps={{
                type: "transparent",
                color: "#cecece",
                icon: {
                  component: <MoreVertIcon />,
                  size: 24,
                },
              }}
              items={[
                {
                  icon: {
                    component: <CropIcon />,
                    float: "left",
                    color: "red",
                    size: 22,
                  },
                  text: "Menu Item",
                },
                {
                  icon: {
                    component: <CropIcon />,
                    float: "left",
                    color: "purple",
                    size: 22,
                  },
                  text: "Menu Item",
                },
                {
                  icon: {
                    component: <CropIcon />,
                    float: "left",
                    color: "yellow",
                    size: 22,
                  },
                  text: "Menu Item",
                },
              ]}
            />
          ),
        };
      case "meeting":
        return {
          id: String(Math.random()),
          lazyLoadingImage: `data:image/png;base64,${photo()}`,
          avatarFlexible: true,
          subject: loremIpsum({ count: 1, units: "sentences" }),
          date: new Date(),
          avatars: Array(token() + 2)
            .fill(1)
            .map((x) => ({
              src: `data:image/png;base64,${photo()}`,
            })),
          closable: true,
        };
    }
  };

  const addMessage = (mtype) => {
    // var list = state.messageList;
    // list.push(random("message", mtype));
    // setMessageList({
    //   messageList: list,
    // });

    setMessageList([...messageList, random("message", mtype)]);
  };

  const addMessageText = async () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 25; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // mtype = "text";
    let status = "waiting"; // waiting,

    let m = {
      // position: "right",
      // forwarded: true,
      // replyButton: true,
      // removeButton: true,
      // retracted: false,
      // reply:
      //   token() >= 1
      //     ? {
      //         photoURL:
      //           token() >= 1 ? `data:image/png;base64,${photo(150)}` : null,
      //         title: loremIpsum({ count: 2, units: "words" }),
      //         titleColor: getRandomColor(),
      //         message: loremIpsum({ count: 1, units: "sentences" }),
      //       }
      //     : null,
      // meeting:
      //   token() >= 1
      //     ? {
      //         subject: loremIpsum({ count: 2, units: "words" }),
      //         title: loremIpsum({ count: 2, units: "words" }),
      //         date: +new Date(),
      //         collapseTitle: loremIpsum({ count: 2, units: "words" }),
      //         participants: Array(token() + 6)
      //           .fill(1)
      //           .map((x) => ({
      //             id: parseInt((Math.random() * 10) % 7),
      //             title: loremIpsum({ count: 1, units: "words" }),
      //           })),
      //         dataSource: Array(token() + 5)
      //           .fill(1)
      //           .map((x) => ({
      //             id: String(Math.random()),
      //             avatar: `data:image/png;base64,${photo()}`,
      //             message: loremIpsum({ count: 1, units: "sentences" }),
      //             title: loremIpsum({ count: 2, units: "words" }),
      //             avatarFlexible: true,
      //             date: +new Date(),
      //             event: {
      //               title: loremIpsum({ count: 2, units: "words" }),
      //               avatars: Array(token() + 2)
      //                 .fill(1)
      //                 .map((x) => ({
      //                   src: `data:image/png;base64,${photo()}`,
      //                   title: "react, rce",
      //                 })),
      //               avatarsLimit: 5,
      //             },
      //             record: {
      //               avatar: `data:image/png;base64,${photo()}`,
      //               title: loremIpsum({ count: 1, units: "words" }),
      //               savedBy:
      //                 "Kaydeden: " + loremIpsum({ count: 2, units: "words" }),
      //               time: new Date().toLocaleString(),
      //             },
      //           })),
      //       }
      //     : null,
      type: "text",
      theme: "black",
      view: "list",
      // title: loremIpsum({ count: 2, units: "words" }),
      // title: props.user.display_name,
      // titleColor: getRandomColor(),
      text: message,
      // text:
      //   mtype === "spotify"
      //     ? "spotify:track:0QjjaCaXE45mvhCnV3C0TA"
      //     : loremIpsum({ count: 1, units: "sentences" }),
      // data: {
      //   videoURL:
      //     token() >= 1
      //       ? "https://www.w3schools.com/html/mov_bbb.mp4"
      //       : "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
      //   audioURL: "https://www.w3schools.com/html/horse.mp3",
      //   uri: `data:image/png;base64,${photo(150)}`,
      //   // status: {
      //   //   click: true,
      //   //   loading: 0.5,
      //   //   download: mtype === "video",
      //   // },
      //   size: "100MB",
      //   width: 300,
      //   height: 300,
      //   latitude: "37.773972",
      //   longitude: "-122.431297",
      //   staticURL:
      //     "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY",
      // },
      onLoad: () => {
        console.log("Photo loaded");
      },
      status: status,
      date: +new Date(),
      onReplyMessageClick: () => {
        console.log("onReplyMessageClick");
      },
      onRemoveMessageClick: () => {
        console.log("onRemoveMessageClick");
      },
      // avatar: `data:image/png;base64,${photo()}`,
    };

    m = {
      ...m,
      conversationId: currentChat._id,
      senderId: props.user._id,
      receiverId: _.find(currentChat.members, (i) => i != props.user._id),
      _id: result,
    };

    const formData = new FormData();
    // filesArr.map((file) => {
    formData.append("datas", JSON.stringify(m));

    let response = await axios.post(`/v1/add_message`, formData, {
      headers: {
        Authorization: _.isEmpty(ls.get("basic_auth"))
          ? `Basic ${process.env.REACT_APP_AUTHORIZATION}`
          : ls.get("basic_auth"),
      },
    });

    response = response.data;

    console.log("ProfilePage > response :", response, m);

    if (response.result) {
      console.log("ProfilePage > response :", response, result);
    }

    setMessageList([...messageList, m]);

    inputRef.current.clear();
  };

  const addMessageImage = async (file) => {
    // mtype = "text";

    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 25; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // uri = uri.split(",");

    // console.log("strings :", strings);

    let status = "waiting"; // waiting,

    let m = {
      // position: "right",
      // forwarded: true,
      // replyButton: true,
      // removeButton: true,
      // retracted: false,
      // reply:
      //   token() >= 1
      //     ? {
      //         photoURL:
      //           token() >= 1 ? `data:image/png;base64,${photo(150)}` : null,
      //         title: loremIpsum({ count: 2, units: "words" }),
      //         titleColor: getRandomColor(),
      //         message: loremIpsum({ count: 1, units: "sentences" }),
      //       }
      //     : null,
      // meeting:
      //   token() >= 1
      //     ? {
      //         subject: loremIpsum({ count: 2, units: "words" }),
      //         title: loremIpsum({ count: 2, units: "words" }),
      //         date: +new Date(),
      //         collapseTitle: loremIpsum({ count: 2, units: "words" }),
      //         participants: Array(token() + 6)
      //           .fill(1)
      //           .map((x) => ({
      //             id: parseInt((Math.random() * 10) % 7),
      //             title: loremIpsum({ count: 1, units: "words" }),
      //           })),
      //         dataSource: Array(token() + 5)
      //           .fill(1)
      //           .map((x) => ({
      //             id: String(Math.random()),
      //             avatar: `data:image/png;base64,${photo()}`,
      //             message: loremIpsum({ count: 1, units: "sentences" }),
      //             title: loremIpsum({ count: 2, units: "words" }),
      //             avatarFlexible: true,
      //             date: +new Date(),
      //             event: {
      //               title: loremIpsum({ count: 2, units: "words" }),
      //               avatars: Array(token() + 2)
      //                 .fill(1)
      //                 .map((x) => ({
      //                   src: `data:image/png;base64,${photo()}`,
      //                   title: "react, rce",
      //                 })),
      //               avatarsLimit: 5,
      //             },
      //             record: {
      //               avatar: `data:image/png;base64,${photo()}`,
      //               title: loremIpsum({ count: 1, units: "words" }),
      //               savedBy:
      //                 "Kaydeden: " + loremIpsum({ count: 2, units: "words" }),
      //               time: new Date().toLocaleString(),
      //             },
      //           })),
      //       }
      //     : null,
      type: "photo",
      theme: "black",
      view: "list",
      // title: loremIpsum({ count: 2, units: "words" }),
      // title: props.user.display_name,
      // titleColor: getRandomColor(),
      text: message,
      // text:
      //   mtype === "spotify"
      //     ? "spotify:track:0QjjaCaXE45mvhCnV3C0TA"
      //     : loremIpsum({ count: 1, units: "sentences" }),
      data: {
        videoURL:
          token() >= 1
            ? "https://www.w3schools.com/html/mov_bbb.mp4"
            : "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
        audioURL: "https://www.w3schools.com/html/horse.mp3",
        // uri: `data:image/png;base64,${photo(150)}`,
        // mimeType: uri[0],
        // uri: Buffer.from(uri[1], "utf8"),
        uri: "https://img.freepik.com/free-vector/cute-monkey-playing-skateboard-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3516.jpg?size=338&ext=jpg",

        //
        // status: {
        //   click: true,
        //   loading: 0.5,
        //   download: mtype === "video",
        // },
        files: [file],
        size: "100MB",
        width: 300,
        height: 300,
        latitude: "37.773972",
        longitude: "-122.431297",
        staticURL:
          "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY",
      },
      onLoad: () => {
        console.log("Photo loaded");
      },
      status: status,
      date: +new Date(),
      onReplyMessageClick: () => {
        console.log("onReplyMessageClick");
      },
      onRemoveMessageClick: () => {
        console.log("onRemoveMessageClick");
      },
      // avatar: `data:image/png;base64,${photo()}`,
    };

    m = {
      ...m,
      conversationId: currentChat._id,
      senderId: props.user._id,
      receiverId: _.find(currentChat.members, (i) => i != props.user._id),
      _id: result,
    };

    const formData = new FormData();
    // filesArr.map((file) => {
    formData.append("datas", JSON.stringify(m));
    formData.append("files[]", file);
    // });

    let response = await axios.post(
      `/v1/add_message`,
      // { ...m },
      formData,
      {
        headers: {
          Authorization: _.isEmpty(ls.get("basic_auth"))
            ? `Basic ${process.env.REACT_APP_AUTHORIZATION}`
            : ls.get("basic_auth"),
        },
      }
    );

    response = response.data;
    if (response.result) {
      console.log("ProfilePage > response :", response, result);
    }

    setMessageList([...messageList, m]);

    inputRef.current.clear();
  };

  const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   const message = {
    //     sender: user._id,
    //     text: newMessage,
    //     conversationId: currentChat._id,
  };

  //   const receiverId = currentChat.members.find(
  //     (member) => member !== user._id
  //   );

  //   socket.current.emit("sendMessage", {
  //     senderId: user._id,
  //     receiverId,
  //     text: newMessage,
  //   });

  //   try {
  //     const res = await axios.post("/messages", message);
  //     setMessages([...messages, res.data]);
  //     setNewMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onUserInputSubmit = (message) => {
    console.log("onUserInputSubmit : ", message);
    // setState({
    //   messageList: [...state.messageList, message],
    // });

    // setMessageList([...messageList, message]);

    _sendMessage({ ...message, status: "send" });
  };

  const onFilesSelected = (files) => {
    var filesArr = Array.prototype.slice.call(files);
    let messages = [];
    _.map(filesArr, (file) => {
      let message = {
        author: "me",
        type: "file",
        status: "send",
        data: {
          url: URL.createObjectURL(file),
          fileName: file.name,
        },
        created: new Date().getTime(),
        updated: new Date().getTime(),
      };

      // messages = [...messages, message];

      _sendMessage(message);
    });

    // console.log("onFilesSelected messages : ", messages);
    // setMessageList([...messageList, ...messages]);
  };

  const _sendMessage = async (message) => {
    console.log("props.message  > ", message, currentChat);

    // function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 25; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //  return result;
    // }

    // conversationId: String,
    // sender: String,
    // text: String,
    message = {
      ...message,
      conversationId: currentChat._id,
      senderId: props.user.uid,
      receiverId: currentChat.author_id,
      _id: result,
    };

    let response = await axios.post(
      `/v1/add_message`,
      { ...message },
      {
        headers: {
          Authorization: _.isEmpty(ls.get("basic_auth"))
            ? `Basic ${process.env.REACT_APP_AUTHORIZATION}`
            : ls.get("basic_auth"),
        },
      }
    );

    response = response.data;
    if (response.result) {
      console.log("ProfilePage > response :", response, result);
    }

    setMessages([...messages, message]);
  };

  const _showFilePicker = () => {
    _fileUploadButton.click();
  };

  const _onFilesSelected = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      // onFilesSelected(event.target.files);

      console.log("event.target.files :", event.target.files);

      var filesArr = Array.prototype.slice.call(event.target.files);

      _.map(filesArr, async (file) => {
        // let message = {
        //   author: "me",
        //   type: "file",
        //   status: "send",
        //   data: {
        //     url: URL.createObjectURL(file),
        //     fileName: file.name,
        //   },
        //   created: new Date().getTime(),
        //   updated: new Date().getTime(),
        // };
        // // messages = [...messages, message];
        // _sendMessage(message);

        // addMessageImage(await toBase64(file));

        addMessageImage(file);

        // console.log("utils.toBase64(file) :", await toBase64(file));
        // console.log("URL.createObjectURL(file) : ", URL.createObjectURL(file));
      });

      // const formData = new FormData();
      // filesArr.map((file) => {
      //   formData.append("files[]", file);
      // });
    }
  };

  const base64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const userActive = () => {
    if (_.isEmpty(currentChat)) {
      return;
    }

    let frind_id = _.find(currentChat.members, (im) => im != props.user._id);

    if (_.isEmpty(frind_id)) {
      return;
    }

    let profile_friend = _.find(props.friends, (item) => item._id == frind_id);

    return (
      <div className="userActive">
        <div>
          <img
            className="messageImg"
            src={process.env.REACT_APP_URL_SERVER + profile_friend.images.path}
            alt=""
          />
        </div>
        <div>{profile_friend.display_name}</div>
      </div>
    );
  };

  const render_image = (msg) => {
    switch (msg.type) {
      case "photo": {
        if (_.has(msg.data, "files")) {
          if (!_.isEmpty(msg.data.files) && "type" in msg.data.files[0]) {
            return URL.createObjectURL(msg.data.files[0]);
          }
        }

        if (!_.isEmpty(msg.data.files)) {
          return process.env.REACT_APP_URL_SERVER + msg.data.files[0].path;
        }
      }
    }
    return "";
  };

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />

            {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}

            <div className="conversationMenuWrapper">

            {[1,2,3,4,5,6,7,8,9,10].map((item, index) => {
              return (
                <div key={index} className="conversation">
                   <Conversation
                      // item={item}
                      profile={{display_name: "display_name "+ index, url:"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/212.jpg"}}
                      onClick={(e) => {
                        // setMessageList([]);
                        // // loadingMessage, setLoadingMessage

                        // setLoadingMessage(true);
                        // setCurrentChat(item);

                        // console.log("item :", item);
                      }}
                    />
                </div>
                  )
            })}
              {/* {conversations.map((item, index) => {
                let frind_id = _.find(
                  item.members,
                  (im) => im != props.user._id
                );

                if (_.isEmpty(frind_id)) {
                  return;
                }

                let profile_friend = _.find(
                  props.friends,
                  (item) => item._id == frind_id
                );

                return (
                  <div key={index} className="conversation">
                    <Conversation
                      item={item}
                      profile={profile_friend}
                      onClick={(e) => {
                        setMessageList([]);
                        // loadingMessage, setLoadingMessage

                        setLoadingMessage(true);
                        setCurrentChat(item);

                        console.log("item :", item);
                      }}
                    />
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">

            {


            
            [{type: "text", text: "1"}, {type: "text", text: "2"}].map((msg, idx) => {
              return (
                <div
                  className={"message right"}
                  key={idx}
                >                  
                  <MessageBox
                    key={idx}
                    position={"left"}
                    type={msg.type}
                    // onClick={() => window.open(msg.data.uri)}
                    text={msg.text}
                   
                    status={"none"}
                    // title={!isSender ? currentChat.author_name : null}
                    // avatar={
                    //   !isSender ? currentChat.author_image_url : null
                    // }
                    onOpen={(e) => {
                      console.log("ABc");
                    }}
                  /> 
                </div>
              );
            })

            
          }
          



            {/* <>
              {_.isEmpty(currentChat) ? <div /> : userActive()}

              <div className="chatBoxTop" ref={(el) => (scrollList = el)}>
                {loadingMessage ? (
                  <BarLoader
                    color={"gray"}
                    loading={true}
                    css={override}
                    size={20}
                  />
                ) : (
                  !_.isEmpty(currentChat) &&
                  messageList.map((msg, idx) => {
                    // console.log(">> ", msg.senderId, props.user.uid);
                    // console.log(
                    //   msg.data.mimeType +
                    //     "," +
                    //     // JSON.stringify(msg.data.uri.toString("base64"))
                    //     Buffer.from(msg.data.uri, "base64")
                    // );
                    const isSender = msg.senderId === props.user._id;
                    return (
                      <div
                        className={isSender ? " message left" : "message right"}
                        key={idx}
                      >
                        <MessageBox
                          key={idx}
                          position={isSender ? "right" : "left"}
                          type={msg.type}
                          // onClick={() => window.open(msg.data.uri)}
                          text={msg.text}
                          data={{
                            // uri: msg.type === "photo" ? msg.data.uri : null,

                            uri: render_image(msg),
                            // .toString('utf8')
                            // status: {
                            //   click: false,
                            //   loading: 0,
                            //   download: false,
                            // },

                            // URL.createObjectURL(files[0])
                          }}
                          status={!isSender ? "none" : msg.status}
                          // title={!isSender ? currentChat.author_name : null}
                          // avatar={
                          //   !isSender ? currentChat.author_image_url : null
                          // }
                          onOpen={(e) => {
                            console.log("ABc");
                          }}
                        />
                      </div>
                    );
                  })
                )}
              </div>

              {_.isEmpty(currentChat) ? (
                <div />
              ) : (
                <div className="chatBoxBottom">
                  <Input
                    placeholder="Type here..."
                    ref={inputRef}
                    // ref={(el) => (inputRef = el)}
                    // multiline={true}
                    autoHeight={true}
                    maxHeight={500}
                    leftButtons={
                      <div className="sc-user-input--button">
                        <FontAwesomeIcon
                          icon={faCamera}
                          onClick={_showFilePicker}
                        />
                        <input
                          type="file"
                          name="files[]"
                          multiple={false}
                          ref={(e) => {
                            _fileUploadButton = e;
                          }}
                          onChange={_onFilesSelected}
                        />
                      </div>
                    }
                    rightButtons={
                      <Button
                        disabled={_.isEmpty(message) ? true : false}
                        color="white"
                        // backgroundColor="black"
                        text="SEND"
                        // onClick={handleSend}
                        onClick={(e) => {
                          console.log("SEND");
                          if (!_.isEmpty(message)) {
                            addMessageText();
                          }
                        }}
                      />
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !_.isEmpty(message)) {
                        console.log("Enter", e.target.value);
                        // processMessage(e.target.value);

                        // let keys = [
                        //   "photo",
                        //   "text",
                        //   "location",
                        //   "video",
                        //   "audio",
                        // ];

                        // let key = Math.floor(Math.random() * keys.length - 1);
                        // addMessage(keys[key]);

                        addMessageText();
                      }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    inputStyle={{
                      border: "2px solid #dedede",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "5px",
                      padding: "10px",
                      margin: "10px 0",
                    }}
                  />
                </div>
              )}
            </> */}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   // if (!_.isEmpty(currentChat)) {

//   console.log("ownProps : ", ownProps, state);
//   return {
//     user: state.user.data,
//     messages: state.messages.messages,
//     converstions: state.user.converstions,
//     friends: state.friends.data,
//   };
// };

// const mapDispatchToProps = {
//   addConversations,
//   addMessages,
//   addMessage,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage);

export default index;
