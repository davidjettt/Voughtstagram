import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ShowFollows from './ShowFollows'
import './followmodal.css'


export default function ShowFollowsModal({type, profileId}) {

  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState(0)

  const profileUser = useSelector(state => state.users[profileId])

  useEffect(() => {
      type === 'following' ?
      setButtonText(`${profileUser.following.length} following`) :
      setButtonText(`${profileUser.followers.length} followers`)
  }, [profileUser])

  return (
    <>
      <div onClick={() => setShowModal(true)}>{profileUser && buttonText}</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            {
                type === 'followers' &&
                profileUser &&
                <ShowFollows type='followers' profileUserId={profileUser.id} />
            }

            {
                type === 'following' &&
                profileUser &&
                <ShowFollows type='following' profileUserId={profileUser.id}/>
            }

        </Modal>
      )}
    </>
  );
}
