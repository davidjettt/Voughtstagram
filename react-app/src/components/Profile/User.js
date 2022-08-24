import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal'
import SinglePostModal from '../posts/SinglePostModal';
import ProfilePostModal from './ProfilePostModal';
// import SinglePost from '../posts/SinglePostModal/SinglePost';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const posts = useSelector(state => Object.values(state.posts.normalizedPosts))
  const userPosts = posts.filter(post => post.userId == userId)
  
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div>{user.username}</div>
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
