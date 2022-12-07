import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProfilePostModal from './ProfilePostModal';
import ShowFollowsModal from './ShowFollowsModal/ShowFollowsModal'
import './profile.css'
import FollowButton from './FollowButton';
import defaultProfile from '../../../src/Images/defaultprofilepic.svg'

function User() {
  const { userId } = useParams();
  const sessionUserId = useSelector(state => state.session.user.id)

  const profileUser = useSelector(state => state.users[Number(userId)])
  const sessionUser = useSelector(state => state.users[sessionUserId])

  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)

  const [following, setFollowing] = useState(false)
  const [numberOfPosts, setNumberOfPosts] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setFollowing(sessionUser?.following.includes(profileUser?.id))
    setNumberOfPosts(userPosts?.length)
  }, [sessionUser, profileUser, posts])

  if (!sessionUser || !profileUser) {
    return null;
  }

  return (
    <div className='profile-container'>
      <div className='profile-header-container'>
        <div className='profile-header-avatar-container'>

          <div className='profile-header-avatar'>
            <img className='profile-header-avatar-image' src={profileUser.avatar || defaultProfile} ></img>

          </div>
        </div>
        <div className='profile-header-info'>
          <div className='profile-header-username'>
            <span className='profile-name'>{profileUser.username}</span>
            {+userId === +sessionUserId &&
              <Link className='edit-profile-link' to={`/account/settings`}>Edit profile</Link>
            }
            {
              profileUser &&
              <FollowButton following={following} profileUserId={profileUser.id} />
            }
          </div>

          <div className='profile-info-container'>

            <div className='followers-display'>
              <strong>{numberOfPosts && numberOfPosts}</strong> Posts
            </div>
            <div className='profile-info '>
              {
                profileUser &&
                <ShowFollowsModal type='followers' list={profileUser.followers} />
              }
            </div>
            <div className='profile-info'>
              {
                sessionUser &&
                profileUser &&
                <ShowFollowsModal type='following' list={profileUser.following} />
              }
            </div>
          </div>
          <div className='profile-name'>
              {profileUser.name}
            </div>
          <div className='profile-bio'>
            {profileUser.bio}
          </div>
        </div>
      </div>
      <div className='profile-post-body'>

        <div className='profile-post-image-container'>
          {userPosts && userPosts.map(post => {
            return (
              <div className="profile-post-card" key={post.id}>
                <ProfilePostModal post={post} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
export default User;
