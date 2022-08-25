import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ShowFollows from './ShowFollows'
import './followmodal.css'


export default function ShowFollowsModal({ type, profileId }) {

  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState(0)
  const [renderModal, setRenderModal] = useState(false)

  const profileUser = useSelector(state => state.users[profileId])

  useEffect(() => {
    type === 'following' ?
      setButtonText(`${profileUser.following.length} following`) :
      setButtonText(`${profileUser.followers.length} followers`)
  }, [profileUser])

  useEffect(() => {
    type === 'following' ?
      setRenderModal(profileUser?.following.length > 0) :
      setRenderModal(profileUser?.followers.length > 0)
  })

  return (
    <>

      {renderModal &&
        <>
          <div onClick={() => setShowModal(true)}>{profileUser && buttonText}</div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>

              {type === 'followers' &&
                profileUser &&
                <ShowFollows type='followers' profileUserId={profileUser.id} />}

              {type === 'following' &&
                profileUser &&
                <ShowFollows type='following' profileUserId={profileUser.id} />}

            </Modal>
          )}
        </>
      }

      {!renderModal &&
        <div>{profileUser && buttonText}</div>}
    </>
  );
}
