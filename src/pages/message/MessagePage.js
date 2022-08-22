import "./messenger.css";
import React, { useState, useEffect, useRef } from "react";
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

import { useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash"
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import moment from "moment";

import { gqlFetchMessage, gqlAddMessage, subMessage, gqlUpdateMessageRead} from "../../gqlQuery"

import { addedConversation } from "../../redux/actions/auth"

import MessageItem from "./MessageItem"

let unsubscribeSubMessage = null

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *  charactersLength));
 }
 return result;
}

function truncate(str, n){

  const regex = /(<([^>]+)>)/ig;
  str = str.replace(regex, '');

  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

const MessagePage =(props)=> {
  let {user, conversations, addedConversation} = props;

  const inputFile = useRef(null) 

  let {state} = useLocation()

  const [conversationList, setConversationList] = useState(conversations);
  const [preConversationList, setPreConversationList] = useState(conversations);
  const [currentConversation, setCurrentConversation] = useState(conversations[0]);
  const [messageList, setMessageList] = useState([]);

  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [counter, setCounter] = useState(0);

  const [messageInputValue, setMessageInputValue] = useState("");
  const avatarIco =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=";

  const fetchMessageValues =useQuery(gqlFetchMessage, {
    variables: {conversationId: ""},
    notifyOnNetworkStatusChange: true,
  });  

  const [onAddMessage, resultAddMessageValues] = useMutation(gqlAddMessage
    , {
        update: (cache, {data: {addMessage}}) => {
          const data1 = cache.readQuery({
              query: gqlFetchMessage,
              variables: {conversationId: currentConversation._id},
          });

          let newData = {...data1.fetchMessage}

          if(!_.find(newData.data, n=>n._id === addMessage._id)) {
            newData = {...newData, data: [...newData.data, addMessage]}
            cache.writeQuery({
                query: gqlFetchMessage,
                data: {
                    fetchMessage: newData
                },
                variables: {conversationId: currentConversation._id},
            });
          }
        },
        context: {
          headers: {
            'apollo-require-preflight': true,
          },
        },
        onCompleted({ data }) {
          console.log(data)
        }
    },  
  );
  // console.log("resultAddMessageValues :", resultAddMessageValues)

  // 
  const [onUpdateMessageRead, resultUpdateMessageRead] = useMutation(gqlUpdateMessageRead
    , {
        update: (cache, {data: {updateMessageRead}}) => {

          console.log("update : updateMessageRead :", updateMessageRead)

          addedConversation(updateMessageRead)
          // const data1 = cache.readQuery({
          //     query: gqlFetchMessage,
          //     variables: {conversationId: currentConversation._id},
          // });

          // let newData = {...data1.fetchMessage}

          // if(!_.find(newData.data, n=>n._id === addMessage._id)) {
          //   newData = {...newData, data: [...newData.data, addMessage]}
          //   cache.writeQuery({
          //       query: gqlFetchMessage,
          //       data: {
          //           fetchMessage: newData
          //       },
          //       variables: {conversationId: currentConversation._id},
          //   });
          // }
        },
        onCompleted({ data }) {
          console.log(data)
        }
    },  
  );
  // console.log("resultAddMessageValues :", resultAddMessageValues)

  useEffect(()=>{

    return () => {
      console.log("cleaned up");

      unsubscribeSubMessage && unsubscribeSubMessage()
    };
  }, [])

  useEffect(()=>{
    if(!_.isEmpty(state)){
      let index = _.findIndex(conversations, (conversation)=>conversation._id === state.conversationId )
      setCurrentConversation(conversations[index === -1 ? 0 : index])
    }
  }, [state])

  useEffect(()=>{
    setConversationList(conversations)

    setPreConversationList(conversations)

    // console.log("conversations :", currentConversation)
  }, [conversations])

  useEffect(()=>{
    if(!_.isEmpty(currentConversation)){
      fetchMessageValues.refetch({conversationId: currentConversation._id});

      onUpdateMessageRead({ variables: {userId: user.id, conversationId: currentConversation._id} });
    }else{
      fetchMessageValues.refetch({conversationId: ""});
    }
  }, [currentConversation])
  
  // status, waiting, sent, received, read
  const onSidebarLeft = () =>{
    return  <Sidebar position="left" scrollable={false}>
              <Search 
                placeholder="Search..." 
                onClearClick={(e)=>{
                  setConversationList(preConversationList)
                }}
                onChange={(e)=>{
                  if(!_.isEmpty(e)){
                    let newConversationList = _.filter(conversationList, conversation =>{ 
                      let mfriend = _.find(conversation.members, (member)=>member.userId !== user.id)
                      return conversation.lastSenderName.toLowerCase().includes(e.toLowerCase()) || conversation.info.toLowerCase().includes(e.toLowerCase()) || mfriend.name.toLowerCase().includes(e.toLowerCase())
                    })
                    setConversationList(newConversationList)
                  }else{
                    setConversationList(preConversationList)
                  }
                }}/>
              <ConversationList>
                {
                  _.map(conversationList, (conversation)=>{
                    let muser = _.find(conversation.members, (member)=>member.userId === user.id)
                    let mfriend = _.find(conversation.members, (member)=>member.userId !== user.id)

                    // console.log("muser :", muser, mfriend, conversation, user.id)

                    return  <Conversation
                              name={mfriend.name}
                              lastSenderName={conversation.lastSenderName}
                              info={ truncate(conversation.info, 25)}
                              unreadCnt={muser.unreadCnt}
                              active={ conversation._id === currentConversation._id ? true: false}
                              onClick={(e)=>{
                               
                                setCurrentConversation(conversation)
                              }}
                              lastActivityTime={moment(conversation.sentTime).format('M/D/YY, hh:mm A')}>
                              <Avatar src={mfriend.avatarSrc} name={conversation.avatarName} status={conversation.status} />
                            </Conversation>
                  })
                }
              </ConversationList>
            </Sidebar>
  }

  const onConversationHeader = () =>{
    if(_.isEmpty(currentConversation)){
      return <div />
    }

    let friend = _.find(currentConversation.members, (member)=>member.userId !== user.id)
    return  <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={friend.avatarSrc} name={friend.name} />
              <ConversationHeader.Content
                userName={friend.name}
                info={moment(currentConversation.sentTime).format('M/D/YY, hh:mm A')}
              />
              <ConversationHeader.Actions>
                {/* <VoiceCallButton />
                <VideoCallButton /> */}
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
  }

  const onSidebarRight = () =>{
    return  <Sidebar position="right">
              <ExpansionPanel open title="INFO">
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </ExpansionPanel>
              <ExpansionPanel title="LOCALIZATION">
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </ExpansionPanel>
              <ExpansionPanel title="MEDIA">
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </ExpansionPanel>
              <ExpansionPanel title="SURVEY">
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </ExpansionPanel>
              <ExpansionPanel title="OPTIONS">
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </ExpansionPanel>
            </Sidebar>
  }

  const onMessageList = () =>{
    if(!fetchMessageValues.loading){
      let {executionTime, status, data}= fetchMessageValues.data.fetchMessage
      let {subscribeToMore} = fetchMessageValues

      console.log("unsubscribeSubMessage :",  user.id, currentConversation._id)
      unsubscribeSubMessage =  subscribeToMore({
        document: subMessage,
        variables: { userId: user.id, conversationId: currentConversation._id },
        updateQuery: (prev, {subscriptionData, variables}) => {

          if (!subscriptionData.data) return prev;

          let {conversationId} = variables
          let {mutation, data} = subscriptionData.data.subMessage

          if(data.conversationId !== conversationId){
            return prev;
          }

          console.log("subMessage :", subscriptionData, variables)
          
          if(!_.find(prev.fetchMessage.data, (f)=>f._id === data._id)){
            let newPrev = {...prev.fetchMessage, data: [...prev.fetchMessage.data, data]}
            switch(mutation){
              case "CREATED":{
                break
              }
            }  

            return {fetchMessage: newPrev};
          }
          return prev
          
        }
      });

      return  <MessageList
                // typingIndicator={<TypingIndicator content="Zoe is typing" />}
                // loadingMore={loadingMore} 
                // onYReachStart={onYReachStart()}
                >
                {
                  _.map( data, item=>{
                    return <MessageItem {...props} item={item} />
                    /*
                    let {type, message, sentTime, senderId, senderName, position, payload} = item
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
                                        <Avatar src={avatarIco} name="Zoe" size="sm" />
                                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('MMMM Do YYYY, hh:mm A')} />
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
                                      <Message.Footer sentTime={moment.unix(sentTime/1000).format('MMMM Do YYYY, hh:mm A')} />
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
                                        <Avatar src={avatarIco} name="Akane" size="sm" />
                                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('MMMM Do YYYY, hh:mm A')} />
                                    </Message>

                          }

                          case "outgoing":{
                            return  <Message model={{
                                      type,
                                      direction,
                                      position
                                    }}>
                                        <Message.HtmlContent html={message} />
                                        <Message.Footer sentTime={moment.unix(sentTime/1000).format('MMMM Do YYYY, hh:mm A')} />
                                    </Message>
                          }
                        }

                        break;
                      }

                      case "image":{

                        let { src } = payload[0]

                        switch(direction){
                          case "incoming":{
                            return <Message model={{direction, position}}>
                                      <Avatar src={avatarIco} name="Akane" />
                                      <Message.ImageContent src={src} alt={"alt"} width={150} onClick={(event)=>{ console.log("event")}} />
                                      <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />   
                                    </Message>
                          }

                          case "outgoing":{
                            return <Message model={{direction, position}}>
                                    <Message.ImageContent src={src} alt={"alt"} width={150} />
                                    <Message.Footer sentTime={moment.unix(sentTime/1000).format('hh:mm A')} />  
                                  </Message>
                          }
                        }

                        break;
                      }
                    } 
                    */
                    
                  })
                }  
              </MessageList>  
    }
    return <div />
  }

  const onMessageInput = () =>{
    return  <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onAttachClick={(f)=>{
                console.log("onAttachClick :", f)
                inputFile.current.click();
              }}
              onChange={(val) =>{
                console.log("onChange :", val)
                setMessageInputValue(val)
              } }
              onSend={(a, b, c, d) => {

                let input = {}
                if(/<\/?[a-z][\s\S]*>/i.test(messageInputValue)){
                  input = {
                            type: "html",
                            message: messageInputValue,
                            sentTime: Date.now(),
                            // sender: user.displayName,
                            // senderId: user.id, 
                            direction: "outgoing",
                            position: "single"
                          }
                        
                }else{
                  input = {
                            type: "text",
                            message: messageInputValue,
                            sentTime: Date.now(),
                            // sender: user.displayName,
                            // senderId: user.id, 
                            direction: "outgoing",
                            position: "single"
                          }
                }

                input = {...input, _id: makeid(20) , conversationId: currentConversation._id, status: "waiting" }

                console.log("input ", input, user.id)
                onAddMessage({ variables: {userId: user.id, conversationId: currentConversation._id, input } });
                setMessageInputValue("")
              }}
            />
  }

  const onYReachStart = () => {
    if (loadingMore === true) {
      return;
    }

    setLoadingMore(true);
    /* Fake fetch from API */

    /*
    setTimeout(() => {
      const messages = [];

      const maxCounter = counter + 10;
      let i = counter;

      for (; i < maxCounter; i++) {
        messages.push(<Message key={i} model={{
          message: `Message ${i}`,
          sender: "Zoe"
        }} />);
      }

      setLoadedMessages(messages.reverse().concat(loadedMessages));
      setCounter(i);
      setLoadingMore(false);
    }, 1500);
    */
  };

  const onChangeFile = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    // var file = event.target.files[0];
    console.log("file :", event.target.files);

    let input = {
      type: "image",
      message: "picture",
      sentTime: Date.now(),
      // sender: user.displayName,
      // senderId: user.id, 
      direction: "outgoing",
      position: "single",

      payload: [{
              src: URL.createObjectURL(event.target.files[0]),
              alt: "Joe avatar",
              width: "100px"
            }],

      files:event.target.files
    }

      

    
    input = {...input, _id: makeid(20) , conversationId: currentConversation._id, status: "waiting" }


    onAddMessage({ variables: {userId: user.id, conversationId: currentConversation._id, input } });
    
    // image
  }

  return (
    <div style={{ height: "600px", position: "relative", width: "100%" }} >
      <MainContainer responsive>
        {onSidebarLeft()}
        <ChatContainer>
          {onConversationHeader()}
          {onMessageList()}
          {onMessageInput()}
        </ChatContainer>
        {/* {onSidebarRight()} */}

        <input type='file' id='file' ref={inputFile} style={{display: 'none'}}  onChange={onChangeFile} />
      </MainContainer>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let conversations = _.orderBy(state.auth.conversations, (dateObj) => new Date(dateObj.sentTime) , 'desc')
  
  return {
    user: state.auth.user,
    conversations
  }
};

const mapDispatchToProps = {
  addedConversation
}

export default connect( mapStateToProps, mapDispatchToProps )(MessagePage);