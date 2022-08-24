import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditForm from './EditPost';


function EditPostModal({postId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditForm postId={postId}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;