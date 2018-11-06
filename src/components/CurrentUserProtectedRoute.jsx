import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const CurrentUserProtectedRoute = ({ currentUser, render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return !currentUser ? (
        render(props)
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default CurrentUserProtectedRoute;
