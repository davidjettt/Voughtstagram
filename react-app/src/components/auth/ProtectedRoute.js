import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
<<<<<<< HEAD
      {(user) ? props.children : <Redirect to='/' />}
=======
      {(user)? props.children  : <Redirect to='/' />}
>>>>>>> main
    </Route>
  )
};


export default ProtectedRoute;
