//jshint esversion: 8
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

function PrivateRoute({ component: Component, ...rest }) {
    return (
    <Route
        {...rest}
        render={(props) =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect
            to={{
                pathname: "/signin",
            }}
            />
        )
        }
    />
    );
}
export default PrivateRoute;

