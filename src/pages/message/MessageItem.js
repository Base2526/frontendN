import React, { useEffect } from "react";

import _ from "lodash"
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import moment from "moment";
import { useQuery, useMutation } from "@apollo/client";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  AvatarGroup,
  Button,
  Conversation,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  ConversationList,
  InputToolbox,
  Loader,
  TypingIndicator,
  StatusList,
  Status,
  Sidebar,
  Search,
  MessageSeparator,
  action,
  ExpansionPanel
} from "@chatscope/chat-ui-kit-react";
import LinearProgress from '@mui/material/LinearProgress';

import { gqlUser } from "../../gqlQuery"

const MessageItem = (props) => {
    /*
    let {value} = props 

    let userValues = useQuery(gqlUser, {
        variables: {id: value.user_who_fired_event},
        notifyOnNetworkStatusChange: true,
    });

    console.log("onListItem :", userValues, props)

    if(userValues.loading) return <div />

    let { displayName, image } = userValues.data.user.data.image
    */

    const avatarIco =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=";

    let {user, item} = props 

    let {type, message, sentTime, senderId, senderName, position, payload} = item

    let userValues = useQuery(gqlUser, {
        variables: {id: senderId},
        notifyOnNetworkStatusChange: true,
    });

    // console.log("userValues :", userValues)

    let direction = senderId == user.id  ? "outgoing" : "incoming"
    
    switch(type){
        case "text":{
        switch(direction){
            case "incoming":{
                return  <Message
                            type={type}
                            model={{
                                message,
                                sentTime,
                                sender: senderName,
                                direction,
                                position
                            }}>
                             { userValues.loading ? <LinearProgress sx={{width:"100px"}} /> : <Avatar src={_.isEmpty(userValues.data.user.data.image) ? "" : userValues.data.user.data.image[0].base64} name="Zoe" size="sm" /> }
                            <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />
                        </Message>
            }

            case "outgoing":{
            return  <Message
                        type={type}
                        model={{
                        message,
                        sentTime,
                        sender: senderName,
                        direction,
                        position
                        }}
                    >
                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />
                    </Message>
            }
        }

        break;
        }

        case "html":{
        switch(direction){
            case "incoming":{
            return <Message model={{
                        type,
                        direction,
                        position
                    }}>
                        
                        <Message.HtmlContent html={message} />
                        { userValues.loading ? <LinearProgress sx={{width:"100px"}} /> : <Avatar src={_.isEmpty(userValues.data.user.data.image) ? "" : userValues.data.user.data.image[0].base64} name="Zoe" size="sm" /> }
                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />
                    </Message>

            }

            case "outgoing":{
            return  <Message model={{
                        type,
                        direction,
                        position
                    }}>
                        <Message.HtmlContent html={message} />
                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />
                    </Message>
            }
        }

        break;
        }

        case "image":{
            let { src } = payload[0]
            switch(direction){
                case "incoming":{
                    return  <Message model={{direction, position}}>
                                { userValues.loading ? <LinearProgress sx={{width:"100px"}} /> : <Avatar src={_.isEmpty(userValues.data.user.data.image) ? "" : userValues.data.user.data.image[0].base64} name="Zoe" size="sm" /> }
                                <Message.ImageContent className={"message-image"} src={src} alt={"alt"} width={150} onClick={(event)=>{ console.log("event")}} />
                                <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />   
                            </Message>
                }

                case "outgoing":{
                    return  <Message model={{direction, position}}>
                                <Message.ImageContent className={"message-image"} src={src} alt={"alt"} width={150} onClick={(event)=>{ console.log("event")}} />
                                <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />  
                            </Message>
                }
            }

        break;
        }
    } 
};

export default MessageItem;