import "./styles.css";

import React, {useState, useEffect} from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuth } from "./AuthProvider";

const PrivateRoute = ({ children, ...rest }) => {
    
    return (
        <Route
        {...rest}
        render={({ location }) =>
            {
            return  isAuth()
                    ? children
                    : <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}/>
            }
        }/>
    );
}

export default PrivateRoute;
