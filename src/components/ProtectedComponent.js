import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedComponent = ({component: Component, ...rest}) => {
  return(
    <Route
      {...rest}
      render={props => {
        if (localStorage['isLogged']) {
          return <Component {...props} />
        }
        else {
          return <Redirect to={
            {
              pathname: "/",
              state: {
                from: props.location
              }
            }
          } />
        }
      }}
    />
  )
}

export default ProtectedComponent