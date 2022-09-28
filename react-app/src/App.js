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
import MyFeed from './components/posts/MyFeed';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import ImageCrop from './components/posts/ImageCrop';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadAllUsers());
      await dispatch(getAllPosts());
      await dispatch(loadCommentsThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(() => {
  // }, [dispatch])

  // useEffect(() => {
  // }, [dispatch])

  // useEffect(() => {
  // }, [dispatch])

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
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/account/settings' exact={true}>
          <ProfileSettings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/feed">
          <Feed />
        </ProtectedRoute>
        <ProtectedRoute exact path="/myfeed">
          <MyFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/new/' exact={true} >
          <PostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/testing' exact={true} >
          <ImageCrop />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
