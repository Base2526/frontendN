import React, { useEffect, useState, useRef } from "react";
import {
    ChatItem,
    ChatList,
    MessageList,
    Input,
    Button,
    SideBar,
    Dropdown,
    Popup,
    MeetingList
  } from "react-chat-elements";

import _ from "lodash"
import { useQuery, useMutation } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import loremIpsum from "lorem-ipsum";
import Identicon from "identicon.js";
import Avatar from "@material-ui/core/Avatar";

import { gqlUser, gqlFetchMessage, gqlAddMessage } from "../../gqlQuery"

let clearRef = () => {};

const MessageListView = (props) => {
    const messageListReferance = useRef();
    const [isShowChild, setIsShowChild] = useState(false);
    const [preview, setPreview] = useState(false);
    const inputReferance = useRef();

    let {user, currentChat, messageList, onAddMessage} = props

    // console.log("MessageListView : ", currentChat)
    // let messageValue = useQuery(gqlFetchMessage, {
    //     variables: {id: currentChat === null ? "" : currentChat.id},
    //     notifyOnNetworkStatusChange: true,
    // });
    // console.log("MessageListView currentChat :", currentChat);

    let userValue = null
    if(!_.isEmpty(currentChat)){
      let member = _.filter(currentChat.members, (vv)=>vv != user.id)
      userValue = useQuery(gqlUser, {
        variables: {id: member[0]},
        notifyOnNetworkStatusChange: true,
      });

      console.log("MessageListView userValue :", userValue);
    }
    
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
            size: size || 20
        }).toString();
    };

    const random = (type, mtype) => {
        switch (type) {
          case "message":
            mtype = mtype || token();
            var status = "waiting";
            // switch (mtype) {
            //   case 0:
            //     mtype = "photo";
            //     status = "sent";
            //     break;
            //   case 1:
            //     mtype = "file";
            //     status = "sent";
            //     break;
            //   case 2:
            //     mtype = "system";
            //     status = "received";
            //     break;
            //   case 3:
            //     mtype = "location";
            //     break;
            //   case 4:
            //     mtype = "spotify";
            //     break;
            // //   case 5:
            // //     mtype = "meeting";
            // //     break;
            //   case 6:
            //     mtype = "video";
            //     status = "sent";
            //     break;
            //   case 7:
            //     mtype = "audio";
            //     break;
            //   case 8:
            //     mtype = "meetingLink";
            //     break;
            //   default:
            //     mtype = "text";
            //     status = "read";
            //     break;
            // }

            mtype = "text";
            status = "sent";
    
            return {
              position: token() >= 1 ? "right" : "left",
              forwarded: false,
              replyButton: false,
              removeButton: true,
              retracted: true,
              reply: null,
                // token() >= 1
                //   ? {
                //       photoURL:
                //         token() >= 1 ? `data:image/png;base64,${photo(150)}` : null,
                //       title: loremIpsum({ count: 2, units: "words" }),
                //       titleColor: getRandomColor(),
                //       message: loremIpsum({ count: 1, units: "sentences" })
                //     }
                //   : null,
              meeting: null,
                // token() >= 1
                //   ? {
                //       subject: loremIpsum({ count: 2, units: "words" }),
                //       title: loremIpsum({ count: 2, units: "words" }),
                //       date: +new Date(),
                //       collapseTitle: loremIpsum({ count: 2, units: "words" }),
                //       participants: Array(token() + 6)
                //         .fill(1)
                //         .map((x) => ({
                //           id: parseInt((Math.random() * 10) % 7),
                //           title: loremIpsum({ count: 1, units: "words" })
                //         })),
                //       dataSource: Array(token() + 5)
                //         .fill(1)
                //         .map((x) => ({
                //           id: String(Math.random()),
                //           avatar: `data:image/png;base64,${photo()}`,
                //           message: loremIpsum({ count: 1, units: "sentences" }),
                //           title: loremIpsum({ count: 2, units: "words" }),
                //           avatarFlexible: true,
                //           date: +new Date(),
                //           event: {
                //             title: loremIpsum({ count: 2, units: "words" }),
                //             avatars: Array(token() + 2)
                //               .fill(1)
                //               .map((x) => ({
                //                 src: `data:image/png;base64,${photo()}`,
                //                 title: "react, rce"
                //               })),
                //             avatarsLimit: 5
                //           },
                //           record: {
                //             avatar: `data:image/png;base64,${photo()}`,
                //             title: loremIpsum({ count: 1, units: "words" }),
                //             savedBy:
                //               "Kaydeden: " +
                //               loremIpsum({ count: 2, units: "words" }),
                //             time: new Date().toLocaleString()
                //           }
                //         }))
                //     }
                //   : null,
              type: mtype,
              theme: "black",
              view: "list",
              title: loremIpsum({ count: 2, units: "words" }),
            //   titleColor: getRandomColor(),
              text:
                mtype === "spotify"
                  ? "spotify:track:0QjjaCaXE45mvhCnV3C0TA"
                  : loremIpsum({ count: 1, units: "sentences" }),
            //   data: {
            //     videoURL:
            //       token() >= 1
            //         ? "https://www.w3schools.com/html/mov_bbb.mp4"
            //         : "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
            //     audioURL: "https://www.w3schools.com/html/horse.mp3",
            //     uri: `data:image/png;base64,${photo(150)}`,
            //     status: {
            //       click: true,
            //       loading: 0.5,
            //       download: mtype === "video"
            //     },
            //     size: "100MB",
            //     width: 300,
            //     height: 300,
            //     latitude: "37.773972",
            //     longitude: "-122.431297",
            //     staticURL:
            //       "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY"
            //   },
            //   onLoad: () => {
            //     console.log("Photo loaded");
            //   },
              status: status,
              date: +new Date(),
            //   onReplyMessageClick: () => {
            //     console.log("onReplyMessageClick");
            //   },
            //   onRemoveMessageClick: () => {
            //     console.log("onRemoveMessageClick");
            //   },
              avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1085.jpg"//`data:image/png;base64,${photo()}`
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
                      component: <FaMenu />,
                      size: 24
                    }
                  }}
                  items={[
                    {
                      icon: {
                        component: <FaSquare />,
                        float: "left",
                        color: "red",
                        size: 22
                      },
                      text: "Menu Item"
                    },
                    {
                      icon: {
                        component: <FaSquare />,
                        float: "left",
                        color: "purple",
                        size: 22
                      },
                      text: "Menu Item"
                    },
                    {
                      icon: {
                        component: <FaSquare />,
                        float: "left",
                        color: "yellow",
                        size: 22
                      },
                      text: "Menu Item"
                    }
                  ]}
                />
              )
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
                  src: `data:image/png;base64,${photo()}`
                })),
              closable: true
            };
        }
    };

    const addMessage = (mtype) => {
        let input = {...random("message", mtype), conversationId: currentChat === null ? "" : currentChat.id}
        console.log("input :", input)

        onAddMessage(input);
    }

    const topView = () =>{
      if(userValue == null || userValue.loading){
        return <div />
      }

      if(!_.isEmpty(userValue)){
        return <div className="rce-container-input">
                  <div><Avatar src={_.isEmpty(userValue.data.user.data.image) ? "" : userValue.data.user.data.image[0].base64 } /> </div>
                  <div>{userValue.data.user.data.displayName}</div>
                </div>
      }
    }

    return (
        <div>
            <div className="right-panel">
                <div>
                { topView() } 
                </div>
                <MessageList
                    referance={messageListReferance}
                    className="message-list"
                    lockable={true}
                    downButtonBadge={10}
                    dataSource={ messageList }
                    sendMessagePreview={true}
                    isShowChild={isShowChild}
                    downButton={false}
                    customProps={{
                    onDragEnter: (e) => {
                        e.preventDefault();
                        console.log("onDragEnter");
                        setIsShowChild(true);
                    }
                    }}
                    onRemoveMessageClick={(item, i, e) => {
                        console.log("onRemoveMessageClick  : ", item, i, e);
                    }}
                    onTitleClick={(item, i, e) => {
                        console.log("onTitleClick  : ", item, i, e);
                    }}
                    onMessageFocused={(item, i, e) => {
                        console.log("onMessageFocused  : ", item, i, e);
                    }}
                    onClick={(item, i, e) => {
                        console.log("onClick  : ", item, i, e);
                    }}
                    onOpen={(item, i, e) => {
                        console.log("onOpen  : ", item, i, e);
                    }}
                    replyButton={false}
                    removeButton={false}
                >
                    {preview ? (
                    <div
                        className="on-drag-mlist"
                        onClick={() => {
                        setIsShowChild(false);
                        setPreview(false);
                        }}
                    >
                        preview click and finish
                    </div>
                    ) : (
                    <div
                        className="on-drag-mlist"
                        onDragOver={(e) => {
                        e.preventDefault();
                        console.log("onDragOver");
                        }}
                        onDragLeave={(e) => {
                        e.preventDefault();
                        console.log("onDragLeave");
                        setIsShowChild(false);
                        }}
                        onDrop={(e) => {
                        e.preventDefault();
                        console.log(e.dataTransfer.files, "onDrop");
                        setPreview(true);
                        }}
                    >
                        {loremIpsum({ count: 4, units: "words" })}
                    </div>
                    )}
                </MessageList>
                <Input
                    placeholder="Input message"
                    defaultValue=""
                    referance={inputReferance}
                    clear={(clear) => (clearRef = clear)}
                    // buttonsFloat='left'
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            clearRef();
                            addMessage();
                        }
                    }}
                    // multiline={true}
                    rightButtons={
                    <Button
                        text="Send"
                        onClick={() => {
                            clearRef();
                            addMessage();
                        }}
                    />
                    }
                /> 
              </div>
        </div>
    );
};

export default MessageListView;
