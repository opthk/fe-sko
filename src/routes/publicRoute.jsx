import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("x-access-token") ? (
        (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      ) :
        <Component {...props} />
    }
  />
)
