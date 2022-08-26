import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SinglePost from './SinglePost';
import commentImage from '../../../Images/commentbutton.svg'

function SinglePostModal({ postId, commentIcon, postIdCommentIcon, offCommentIcon }) {
  const [showModal, setShowModal] = useState(false);

  const handleCommentIcon = () => {
    if (offCommentIcon) {
      document.querySelector(".comment-form-input").focus()
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      {/* {commentIcon && <div className='comment-image-container'><img className="comment-image-button" onClick={handleCommentIcon}  src={commentImage} alt='' for='my-comment' /></div>} */}
      {!commentIcon && <button className='all-comments-button' onClick={() => setShowModal(true)}>View All Comments</button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SinglePost postId={postId || postIdCommentIcon} />
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;
