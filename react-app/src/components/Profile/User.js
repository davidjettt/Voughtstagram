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
  const allUsers = useSelector(state => state.users)

  console.log(sessionUser, "session User", "profile user", profileUser)
  // get all posts from user at their profile page
  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)

  const [following, setFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followerList, setFollowerList] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [numberOfPosts, setNumberOfPosts] = useState(0)

  // on load and every time the user or profile user changes, check
  // if user is following and update follower count, followers and following
  useEffect(() => {
    setFollowing(sessionUser?.following.includes(profileUser?.id))
    setFollowerCount(profileUser?.followers.length)
    setFollowerList(profileUser?.followers)
    setFollowingList(profileUser?.following)
    setNumberOfPosts(userPosts?.length)
  }, [sessionUser, profileUser])

  console.log(userPosts)


  function handleFollow() {
    following ?
    dispatch(unfollowThunk(profileUser.id)) :
    dispatch(followThunk(profileUser.id))
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
        profileUser.id !== sessionUser.id &&
        followButton
      }

      {
        <div>
          {profileUser.username} has {followerCount} followers!
        </div>
      }

        <ul>
          <h3>Followers:</h3>
          {
            followerList && followerList.map(follower => (
                <li key={follower}>{allUsers[follower].username}</li>
              ))
          }
        </ul>
        <ul>
          <h3>Following:</h3>
          {
            followingList && followingList.map(following => (
                <li key={following}>{allUsers[following].username}</li>
              ))
          }
        </ul>
        <h3>
          Num Posts: {numberOfPosts && numberOfPosts}
        </h3>

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
