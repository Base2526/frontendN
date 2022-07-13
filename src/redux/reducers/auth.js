
import { LOGIN, LOGOUT } from "../../constants"
const initialState = {
    user: {}
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
    }

    return state
}

export default auth;