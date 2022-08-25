import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePostModal from './ProfilePostModal';
import { followThunk, unfollowThunk } from '../../store/users';
import ShowFollows from './ShowFollowsModal/ShowFollows';
import ShowFollowsModal from './ShowFollowsModal/ShowFollowsModal'
import followingIcon from '../../../src/Images/followingicon.svg'
import './profile.css'

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const sessionUserId = useSelector(state => state.session.user.id)

  // get current user and the user whose profile we're on
  const profileUser = useSelector(state => state.users[Number(userId)])
  const sessionUser = useSelector(state => state.users[sessionUserId])

  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)

  const [following, setFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [numberOfPosts, setNumberOfPosts] = useState(0)

  // on load and every time the user or profile user changes, check
  // if user is following and update follower count, followers and following
  useEffect(() => {
    setFollowing(sessionUser?.following.includes(profileUser?.id))
    setNumberOfPosts(userPosts?.length)
    setFollowerCount(profileUser?.followers.length)
    setFollowingCount(profileUser?.following.length)
  }, [sessionUser, profileUser])

  function handleFollow() {
    following ?
    dispatch(unfollowThunk(profileUser.id)) :
    dispatch(followThunk(profileUser.id))
  }

  let followButton

  following ?
  followButton = (<button onClick={handleFollow}><img src={followingIcon}></img></button>) :
  followButton = (<button className="not-following-button" onClick={handleFollow}>Not Following</button>)


  if (!sessionUser || !profileUser) {
    return null;
  }

  return (
    <div className='profile-container'>
      <div className='profile-header'>
      {
        profileUser &&
        sessionUser &&
        profileUser.id !== sessionUser.id &&
        followButton
      }
        <div>
          {profileUser.username}
        </div>
      <div>
     </div>


      </div>

       <div className='profile-info-container'>

         <div className='profile-info'>
           <strong>{numberOfPosts}</strong> Posts
         </div>
         <div className='profile-info'>
           <strong>{followerCount}</strong>
           {
            profileUser &&
            <ShowFollowsModal type='followers' profileId= {profileUser.id}/>
           }
         </div>
         <div className='profile-info'>
           <strong>{followingCount}</strong>
           {
            sessionUser &&
            profileUser &&
            <ShowFollowsModal type='following' profileId={profileUser.id}/>
            }
         </div>
       </div>

      <div className='profile-post-image-container'>
        {userPosts && userPosts.map(post => {
          return (
            <div className="profile-post-card" key={post.id}>
              <ProfilePostModal post={post}/>
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default User;
