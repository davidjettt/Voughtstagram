import React, { useState } from 'react';
import { Modal } from '../../../context/modal';
import SinglePost from './SinglePost';


function SinglePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show All Comments</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost />
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;