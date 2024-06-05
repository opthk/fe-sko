import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("x-access-token") ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )

    }
  />
)
