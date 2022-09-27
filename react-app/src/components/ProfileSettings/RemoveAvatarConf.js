
import { useDispatch } from 'react-redux'
import './UpdateAvatar.css'

export default function RemoveAvatarConf({ setOpenModal }) {
    const dispatch = useDispatch()

    const handleRemoveAvatar = () => {
        // calls dispatch to remove avatar url from db
    }


    const handleCancel = () => {
        setOpenModal(false)
    }


    return (
        <>
            <div className="remove-avatar-modal">
                <div className="remove-avatar-text">
                    <div className="remove-avatar-title">
                        Remove your profile picture?
                    </div>
                    <div className="remove-avatar-sub-title">
                        This will permanently delete your profile picture. This action cannot be undone.
                    </div>
                </div>
                <button style={{borderTop: '1px solid #dbdbdb'}} className="remove-avatar-btn">Remove</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </>
    )
}
