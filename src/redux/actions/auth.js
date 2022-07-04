import { LOGIN, LOGOUT } from "../../constants"

const _login = (data) => ({ type: LOGIN, data });
const _logout = (data) => ({ type: LOGOUT, data });

export const login = (data) => (dispatch) => {
    dispatch(_login(data));
}

export const logout = (data) => (dispatch) => {
    dispatch(_logout(data));
}