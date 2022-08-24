import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ShowFollows from './ShowFollows'


export default function ShowFollowsModal({type, profileId}) {
  const [showModal, setShowModal] = useState(false);
  const profileUser = useSelector(state => state.users[profileId])

  let buttonText
  type === 'following' ?
  buttonText = 'Following' :
  buttonText = 'Followers'

  return (
    <>
      <button onClick={() => setShowModal(true)}>{buttonText}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            {
                type === 'followers' &&
                profileUser &&
                <ShowFollows type='followers' profileUser={profileUser} />
            }

            {
                type === 'following' &&
                profileUser &&
                <ShowFollows type='following' profileUser={profileUser}/>
            }

        </Modal>
      )}
    </>
  );
}
