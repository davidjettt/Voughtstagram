import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SinglePost from './SinglePost';


function SinglePostModal({postId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show All Comments</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SinglePost postId={postId}/>
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;