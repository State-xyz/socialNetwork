import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = React.memo((props) => {
  const { Component, ...rest } = props;
  const auth = useSelector((state) => state.auth_user);
  return (
    <Route
      {...rest}
      component={(_props) => {
        return auth.isLoggedIn || auth.isSignedInWithProvider ? (
          <Component {..._props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
});

export default PrivateRoute;
