import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SinglePost from '../posts/SinglePostModal/SinglePost';


function ProfilePostModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <img onClick={() => setShowModal(true)} src={post.imageUrl} alt=" "></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SinglePost postId={post.id}/>
        </Modal>
      )}
    </>
  );
}

export default ProfilePostModal;