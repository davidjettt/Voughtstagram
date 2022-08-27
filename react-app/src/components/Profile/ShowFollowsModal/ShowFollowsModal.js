import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ShowFollows from './ShowFollows'
import './followmodal.css'


export default function ShowFollowsModal({ type, list }) {

  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState(0)
  const [amount, setAmount] = useState(0)
  const [renderModal, setRenderModal] = useState(false)

  useEffect(() => {
    type === 'following' ?
      setButtonText(`following`) :
      setButtonText(`followers`)
  }, [list])

  useEffect(() => {
    setAmount(list.length)
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
        <div className="open-followers-modal followers-display" onClick={() => setShowModal(true)}><strong>{amount}</strong> {buttonText}</div>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {items}
        </Modal>
      )}

      {!renderModal &&
        <div className='followers-display'><strong>0</strong> {type}</div>}
    </>
  );
}
