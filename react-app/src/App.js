import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/Profile/User';
import { authenticate } from './store/session';
import PostForm from './components/posts/PostForm';
import { getAllPosts } from './store/posts';
import Feed from './components/posts/PostFeed';
import { loadCommentsThunk } from './store/comments';
import LandingPage from './components/LandingPage/LandingPage';
import { loadAllUsers } from './store/users';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() =>{
    dispatch(loadAllUsers())
   }, [dispatch])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadCommentsThunk())
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Switch>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <ProtectedRoute path='/posts/new/' exact={true} >
          <PostForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
