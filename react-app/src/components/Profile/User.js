import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePostModal from './ProfilePostModal';
import { followThunk, unfollowThunk } from '../../store/users';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const sessionUserId = useSelector(state => state.session.user.id)

  // get current user and the user whose profile we're on
  const profileUser = useSelector(state => state.users[Number(userId)])
  const sessionUser = useSelector(state => state.users[sessionUserId])

  console.log(sessionUser, "session User", "profile user", profileUser)
  // get all posts from user at their profile page
  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)

  const [following, setFollowing] = useState(false)

  // on load and every time the user or profile user changes, check
  // if user is following
  useEffect(() => {
    if (sessionUser && profileUser) setFollowing(sessionUser.following.includes(profileUser.id))
  }, [sessionUser, profileUser])


  // if current user is following (their id is in the user's followers) this
  // button unfollows, otherwise it follows
  function handleFollow() {
    console.log(sessionUser.id, profileUser.id, "SESSION AND PROFILE USER IDS")
    if (following) {
      dispatch(unfollowThunk(profileUser.id))
      setFollowing(false)
    } else {
      dispatch(followThunk(profileUser.id))
      setFollowing(true)
    }
  }

  let followButton

  following ?
  followButton = (<button onClick={handleFollow}>Following</button>) :
  followButton = (<button onClick={handleFollow}>Not Following</button>)


  if (!sessionUser || !profileUser) {
    return null;
  }

  return (
    <>
      {
      profileUser &&
      sessionUser &&
      followButton}
      {

      <div>{profileUser.username} has {profileUser.followers.length} followers!</div>
      }
      {userPosts && userPosts.map(post => {
        return (
          <div key={post.id}>
            <ProfilePostModal post={post}/>
          </div>
        )
      })}
    </>
  );
}
export default User;
