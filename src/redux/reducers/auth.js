
import {LOGIN, 
        LOGOUT, 
        ADDED_CONVERSATIONS, 
        ADDED_CONVERSATION,
        ADDED_MESSAGE, 
        EDITED_MESSAGE, 
        DELETED_MESSAGE } from "../../constants"

import _ from "lodash"

const initialState = {
    user: {},
    conversations: [],
    bookmarks:[],
    messages:[]
}

const auth = (state = initialState, action) => {
    console.log("auth :", action);
    switch (action.type) {
        case LOGIN:{
            return { ...state, user: action.data };
        }

        case LOGOUT:{
            localStorage.removeItem("token");
            return initialState;
        }

        case ADDED_CONVERSATIONS: {
            return  {...state, conversations: action.data }
        }

        case ADDED_CONVERSATION: {
            let {mutation, data} = action.data

            let conversations = [...state.conversations]
            if(_.find(conversations, (c)=>c.id == data.id)){

                console.log("_.map(conversations, (c)=>c.id==data.id ? data : c ) :", _.map(conversations, (c)=>c.id==data.id ? data : c ))
                return { ...state, conversations: _.map(conversations, (c)=>c.id==data.id ? data : c ) };
            }
            switch(mutation){
                case "CREATE":
                case "UPDATED":{
                    conversations = [...conversations, data]
                    break;
                }
            }
            return { ...state, conversations };
        }

        case ADDED_MESSAGE: {
            let messages = [...state.messages]
            messages = [...messages, action.data]
            return { ...state, messages };
        }

        case EDITED_MESSAGE: {
            let messages = [...state.messages]
            let newMessages = _.map(messages, m=>m._id===action.data.id ? action.data : m)

            return { ...state, messages:newMessages };
        }
        
        case DELETED_MESSAGE:{
            let messages = [...state.messages]
            let newMessages = _.filter(messages, m=>m._id!==action.data.id)
            return { ...state, messages:newMessages };
        }
    }

    return state
}

export default auth;