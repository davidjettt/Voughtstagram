
import { useDispatch } from 'react-redux'
import { updateSessionUserSettings } from '../../store/session'
import { removeUserAvatarThunk } from '../../store/users'
import './UpdateAvatar.css'

export default function RemoveAvatarConf({ user, setOpenModal }) {
    const dispatch = useDispatch()

    const handleRemoveAvatar = async () => {
        const data = await dispatch(removeUserAvatarThunk(user))
        await dispatch(updateSessionUserSettings(data))
        setOpenModal(false)
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
                <button onClick={handleRemoveAvatar} style={{borderTop: '1px solid #dbdbdb'}} className="remove-avatar-btn">Remove</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </>
    )
}
