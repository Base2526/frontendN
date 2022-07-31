import { useState } from "react";
import _ from "lodash"
import { useQuery, useMutation } from "@apollo/client";
import { ChatItem } from "react-chat-elements";
import CircularProgress from '@mui/material/CircularProgress';

import { gqlUser, } from "../../gqlQuery"

const ChatItemView = (props) => {
    let { item, onCurrentChat } = props

    let { avatar, title, subtitle, unread, muted, updatedAt } = item
    return (
            <ChatItem
                avatar={avatar}
                alt={""}
                title={title}
                subtitle={subtitle}
                date={new Date(updatedAt)}
                unread={unread}
                muted={muted}
                showMute={true}
                onContextMenu={(e)=>{
                    console.log("onContextMenu")
                }}
                onClick={(e)=>{
                    onCurrentChat(item)

                    console.log("item :", item)
                }}
                onClickMute={(e, index)=>{
                    console.log("onClickMute", e, index)
                }}/>
    );
};

export default ChatItemView;
