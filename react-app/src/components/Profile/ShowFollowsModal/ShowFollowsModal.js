import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ShowFollows from './ShowFollows'
import './followmodal.css'


export default function ShowFollowsModal({ type, list }) {

  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState(0)
  const [renderModal, setRenderModal] = useState(false)


  useEffect(() => {
    type === 'following' ?
      setButtonText(`${list.length} following`) :
      setButtonText(`${list.length} followers`)
  }, [list])

  useEffect(() => {
    type === 'following' ?
      setRenderModal(list.length > 0) :
      setRenderModal(list.length > 0)
  }, [list])

  let items

  type === 'following' ?
    items = (
      <ShowFollows setShowModal={setShowModal} type='following' list={list} />
    ) :
    items = (
      <ShowFollows setShowModal={setShowModal} type='followers' list={list} />
    )

  return (
    <>
      {renderModal &&
        <div className="open-followers-modal" onClick={() => setShowModal(true)}>{buttonText}</div>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {items}
        </Modal>
      )}

      {!renderModal &&
        <div>{buttonText}</div>}
    </>
  );
}
