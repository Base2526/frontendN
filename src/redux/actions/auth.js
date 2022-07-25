import {LOGIN, 
        LOGOUT, 
        ADDED_CONVERSATIONS, 
        ADDED_CONVERSATION, 
        ADDED_MESSAGE, 
        EDITED_MESSAGE, 
        DELETED_MESSAGE } from "../../constants"

const _login = (data) => ({ type: LOGIN, data });
const _logout = (data) => ({ type: LOGOUT, data });

const _addedConversations = (data) => ({ type: ADDED_CONVERSATIONS, data });
const _addedConversation = (data) => ({ type: ADDED_CONVERSATION, data });

const _addedMessage = (data) => ({ type: ADDED_MESSAGE, data });
const _editedMessage = (data) => ({ type: EDITED_MESSAGE, data });
const _deletedMessage = (data) => ({ type: DELETED_MESSAGE, data });

export const login = (data) => (dispatch) => {
    dispatch(_login(data));
}

export const logout = (data) => (dispatch) => {
    dispatch(_logout(data));
}

export const addedConversations = (data) => (dispatch) => {
    dispatch(_addedConversations(data));
}

export const addedConversation = (data) => (dispatch) => {
    dispatch(_addedConversation(data));
}

export const addedMessage = (data) => (dispatch) => {
    dispatch(_addedMessage(data));
}

export const editedMessage = (data) => (dispatch) => {
    dispatch(_editedMessage(data));
}

export const deletedMessage = (data) => (dispatch) => {
    dispatch(_deletedMessage(data));
}