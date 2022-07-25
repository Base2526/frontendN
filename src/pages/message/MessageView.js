import "./messenger.css";
import React, { useState, useEffect } from "react";
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

import { connect } from "react-redux";
import _ from "lodash"
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import moment from "moment";

import { gqlFetchMessage, gqlAddMessage, subMessage } from "../../gqlQuery"


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

const MessageView =(props)=> {
  let {user, conversations} = props;
  
  const [conversationList, setConversationList] = useState(conversations);

  const [currentConversation, setCurrentConversation] = useState(conversations[0]);
  const [messageList, setMessageList] = useState([]);

  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [counter, setCounter] = useState(0);

  const [messageInputValue, setMessageInputValue] = useState("");
  const avatarIco =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=";

  const fetchMessageValues =useQuery(gqlFetchMessage, {
    variables: {id: currentConversation.id},
    notifyOnNetworkStatusChange: true,
  });  
  // console.log("fetchMessageValues :", fetchMessageValues)

  const [onAddMessage, resultAddMessageValues] = useMutation(gqlAddMessage
    , {
        update: (cache, {data: {addMessage}}) => {
            const data1 = cache.readQuery({
                query: gqlFetchMessage,
                variables: {id: currentConversation.id},
            });

            let newData = {...data1.fetchMessage}
            newData = {...newData, data: [...newData.data, addMessage]}
            cache.writeQuery({
                query: gqlFetchMessage,
                data: {
                    fetchMessage: newData
                },
               variables: {id: currentConversation.id},
            });
        },
        onCompleted({ data }) {
          console.log("onAddMessage :::: onCompleted ", data)
        }
    },  
  );
  console.log("resultAddMessageValues :", resultAddMessageValues)

  useEffect(()=>{
    setConversationList(conversations)
  }, [conversations])
  
  // status, waiting, sent, received, read
  const onSidebarLeft = () =>{
    return  <Sidebar position="left" scrollable={false}>
              <Search placeholder="Search..." />
              <ConversationList>
                {
                   _.map(conversationList, (conversation)=>
                      <Conversation
                              name={conversation.name}
                              lastSenderName={conversation.lastSenderName}
                              info={ truncate(conversation.info, 25)}
                              unreadCnt={conversation.unreadCnt}
                              active={_.isEqual(conversation, currentConversation) ? true: false}
                              onClick={(e)=>{
                                setCurrentConversation(conversation)
                              }}
                              lastActivityTime={moment(conversation.sentTime).format('MMMM Do YYYY')}>
                              <Avatar src={conversation.avatarSrc} name={conversation.avatarName} status={conversation.status} />
                            </Conversation>
                  )
                }
              </ConversationList>
            </Sidebar>
  }

  const onConversationHeader = () =>{
    if(_.isEmpty(currentConversation)){
      return <div />
    }
    return  <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={currentConversation.avatarSrc} name={currentConversation.avatarName} />
              <ConversationHeader.Content
                userName={currentConversation.avatarName}
                info={moment(currentConversation.sentTime).format('MMMM Do YYYY, hh:mm A')}
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
      // console.log("fetchMessageValues :", executionTime, status, data)

      // console.log("fetchMessageValues executionTime, status, data : ", executionTime, status, data)


      let {subscribeToMore} = fetchMessageValues
      const unsubscribe =  subscribeToMore({
        document: subMessage,
        variables: { id: currentConversation.id },
        updateQuery: (prev, subscriptionData) => {

          console.log("subMessage subscriptionData :", prev, subscriptionData)
          // if (!subscriptionData.data) return prev;

          // let {mutation, data} = subscriptionData.data.subMessage

          // console.log("subMessage :", mutation, data)

          // editedMessage(data)
  
          return prev;

          //     // let { mutation, data } = subscriptionData.data.subPost;
      
          //     // let prevData = prev.homes.data
          //     // let newData = _.map(prevData, (o)=>{
          //     //                 if(o.id === data.id) return data
          //     //                 return o 
          //     //               })
      
          //     // let newPrev = {...prev.homes, data: newData}
          //     // return newPrev;
        }
      });

      console.log("onMessageList :", data)

      return  <MessageList
                typingIndicator={<TypingIndicator content="Zoe is typing" />}
                // loadingMore={loadingMore} 
                // onYReachStart={onYReachStart()}
                >
                {
                  _.map( data, item=>{
                    let {type, message, sentTime, sender, direction, position} = item
                    switch(type){
                      case "text":{
                        switch(direction){
                          case "incoming":{
                              return  <Message
                                        type={type}
                                        model={{
                                          message,
                                          sentTime,
                                          sender,
                                          direction,
                                          position
                                        }}>
                                        <Avatar src={avatarIco} name="Zoe" size="sm" />
                                        <Message.Footer sentTime={moment(sentTime).format('MMMM Do YYYY')} />
                                      </Message>
                          }

                          case "outgoing":{
                            return  <Message
                                      type={type}
                                      model={{
                                        message,
                                        sentTime,
                                        sender,
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
                    } 
                  })
                }  
              </MessageList>   

    }

    

    return <div />


    return  <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
              // loadingMore={loadingMore} 
              // onYReachStart={onYReachStart()}
              >
              {
                _.map(messageList, item=>{
                  let {type, message, sentTime, sender, direction, position} = item
                  switch(type){
                    case "text":{
                      switch(direction){
                        case "incoming":{
                            return  <Message
                                      type={type}
                                      model={{
                                        message,
                                        sentTime,
                                        sender,
                                        direction,
                                        position
                                      }}>
                                      <Avatar src={avatarIco} name="Zoe" size="sm" />
                                      <Message.Footer sentTime="just now" />
                                    </Message>
                        }

                        case "outgoing":{
                          return  <Message
                                    type={type}
                                    model={{
                                      message,
                                      sentTime,
                                      sender,
                                      direction,
                                      position
                                    }}
                                  >
                                    <Message.Footer sentTime="just now" />
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
                                  </Message>

                          // return  <Message
                          //           type={type}
                          //           model={{
                          //             message,
                          //             sentTime,
                          //             sender,
                          //             direction,
                          //             position
                          //           }}>
                          //           <Avatar src={avatarIco} name="Zoe" size="sm" />
                          //           <Message.Footer sentTime="just now" />
                          //         </Message>
                        }

                        case "outgoing":{
                          return  <Message model={{
                                    type,
                                    direction,
                                    position
                                  }}>
                                      <Message.HtmlContent html={message} />
                                      <Message.Footer sentTime="just now" />
                                  </Message>
                        }
                      }

                      break;
                    }
                  } 
                })
              }  
              
              {/*
              <MessageSeparator content="Saturday, 30 November 2019" />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single"
                }}>
                <Avatar src={avatarIco} name="Zoe" size="sm" />
                <Message.Footer sentTime="just now" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "single"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend 1",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend 2",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend 3",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend 4",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={avatarIco} name="Zoe" size="xs" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "first"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "last"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={avatarIco} name="Zoe"  size="xs" />
              </Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={avatarIco} name="Zoe" size="xs" />
              </Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={avatarIco} name="Zoe" size="xs" />
              </Message>
              <Message
                  model={{
                    direction: "incoming"
                  }}
                  avatarPosition="tl"
                  onClick={(e)=>{
                    // console.log("Message")
                  }}
                >
                <Avatar src={"https://icotar.com/avatar/craig"} name="Akane" size="xs" />
                <Message.ImageContent
                  src={"https://icotar.com/avatar/tt"}
                  alt="Akane avatar"
                  width={150}
                />
              </Message>
              <Message
                  model={{
                    direction: "outgoing",
                    type: "custom",
                    sentTime: "just now"
                  }}
                  onClick={(e)=>{
                    console.log("Message ++")
                  }}
                  avatarPosition="tr"
                >
                <Message.CustomContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        marginRight: 8
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#ffffff"
                        class="bi bi-file-earmark-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                      </svg>
                      <br />
                      <span style={{ fontSize: 8 }}>102.02 KB</span>
                    </div>
                    <div>
                      <span style={{ color: "#fff" }}>File name 123.rar</span>
                    </div>
                    <div
                      style={{
                        marginLeft: 8
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#ffffff"
                        class="bi bi-arrow-down-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                        />
                      </svg>
                    </div>
                  </div>
                </Message.CustomContent>
              </Message>
              
              */}
            </MessageList>
  }

  const onMessageInput = () =>{
    return  <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={(a, b, c, d) => {

                let input = {}
                if(/<\/?[a-z][\s\S]*>/i.test(messageInputValue)){
                  input = {
                            type: "html",
                            message: messageInputValue,
                            sentTime: Date.now(),
                            sender: user.displayName,
                            senderId: user.id, 
                            direction: "outgoing",
                            position: "single"
                          }
                        
                }else{
                  input = {
                            type: "text",
                            message: messageInputValue,
                            sentTime: Date.now(),
                            sender: user.displayName,
                            senderId: user.id, 
                            direction: "outgoing",
                            position: "single"
                          }
                }

                input = {...input, _id: makeid(20) , conversationId: currentConversation.id, status: "waiting" }

                onAddMessage({ variables: {id: currentConversation.id, input } });
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

  return (
    <div style={{ height: "600px", position: "relative", width: "100%" }} >
      <MainContainer responsive>
        {onSidebarLeft()}
        <ChatContainer>
          {onConversationHeader()}
          {onMessageList()}
          {onMessageInput()}
        </ChatContainer>
        {onSidebarRight()}
      </MainContainer>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {

  console.log("state.auth.conversations :", state.auth.conversations)
  return {
    user: state.auth.user,
    conversations: state.auth.conversations,
    messages: state.auth.messages
  }
};

export default connect( mapStateToProps, null )(MessageView);