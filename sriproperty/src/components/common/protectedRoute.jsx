import React from "react";
import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProtectedRoute = ({
  path,
  component: Component,
  authenticated,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props.location);
        if (!authenticated)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
