import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePostModal from './ProfilePostModal';
import FollowButton from '../posts/FollowButton/FollowButton';

function User() {
  const { userId }  = useParams();
  const profileUser = useSelector(state => state.users[Number(userId)])
  console.log(profileUser)
  const sessionUser = useSelector(state => state.session.user)

  const [userFollowers, setUserFollowers] = useState(0)
  const [following, setFollowing] = useState(false)

  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)

  // useEffect(() => {
  //   sessionUser.following.includes() ? setFollowing(true) : setFollowing(false)
  // },[])

  if (!sessionUser || !profileUser) {
    return null;
  }

  return (
    <>
      <FollowButton following={following} userId={profileUser.id} setFollowing={setFollowing}/>
      <div>{profileUser.username} has {userFollowers} followers! </div>
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
