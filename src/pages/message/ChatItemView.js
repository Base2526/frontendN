import { useState } from "react";
import _ from "lodash"
import { useQuery, useMutation } from "@apollo/client";
import { ChatItem } from "react-chat-elements";
import CircularProgress from '@mui/material/CircularProgress';

import { gqlUser, gqlConversations } from "../../gqlQuery"

const ChatItemView = ({item, onCurrentChat}) => {

    let userId = "62a2f65dcf7946010d3c7547"

    let members = item.members
    let member = _.filter(members, (vv)=>vv != userId)

    let userValue = useQuery(gqlUser, {
      variables: {id: member[0]},
      notifyOnNetworkStatusChange: true,
    });

    if(!userValue.loading){

        let user = userValue.data.User.data
        console.log("ChatItemView userValue :" , userValue, member, item, user)
    }

    return (
        <div>
            {
            userValue.loading 
            ? <CircularProgress /> 
            : <ChatItem
                avatar={userValue.data.User.data.image[0].base64}
                alt={"Reactjs"}
                title={userValue.data.User.data.displayName}
                subtitle={"What are you doing?"}
                date={new Date()}
                unread={10}
                muted={true}
                showMute={true}
                onContextMenu={(e)=>{
                    console.log("onContextMenu")
                }}
                onClick={(e)=>{
                    onCurrentChat(item)
                }}
                />
            }
            
        </div>
    );
};

export default ChatItemView;
