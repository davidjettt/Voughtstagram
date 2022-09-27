import { Modal } from "../../context/Modal"
import { useState } from "react"
import UpdateAvatar from "./UpdateAvatar"
import './UpdateAvatar.css'

export default function UpdateAvatarModal({ user }) {
    const [ openModal, setOpenModal ] = useState(false)

    const handleModal = () => {
        setOpenModal(true)
    }

    return (
        <>
            <button className="change-profile-photo-btn" onClick={handleModal} >Change profile photo</button>
            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <UpdateAvatar user={user} setOpenModal={setOpenModal} />
            </Modal>}
        </>
    )
}
