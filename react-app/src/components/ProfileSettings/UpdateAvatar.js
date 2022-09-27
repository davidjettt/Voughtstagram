import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSessionUserSettings } from '../../store/session'
import { uploadUserAvatarThunk } from '../../store/users'
import RemoveAvatarConf from './RemoveAvatarConf'

import './UpdateAvatar.css'


export default function UpdateAvatar({ user, setOpenModal }) {
    const dispatch = useDispatch()
    const [ openConf, setOpenConf ] = useState(false)

    function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            if (await isImgUrl(URL.createObjectURL(file))) {
                const formData = new FormData()
                formData.append('avatar', file)
                const data = await dispatch(uploadUserAvatarThunk(formData, user.id))
                await dispatch(updateSessionUserSettings(data))
                setOpenModal(false)
            } else {
                window.alert('Invalid image file. Try again!')
            }
        }
    }

    const handleOpenConf = () => {
        setOpenConf(true)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }


    return (
        <>
            {!openConf && <div className='avatar-modal'>
                <div className='avatar-modal-title'>
                    Change Profile Photo
                </div>
                <label className='upload-avatar-btn'>
                    Upload Photo
                    <input
                        type='file'
                        className='settings-file-input'
                        onChange={handleAvatarUpload}
                    />
                </label>
                <button className='remove-avatar-btn' onClick={handleOpenConf}>Remove Current Photo</button>
                <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
            </div>}
            {openConf && <RemoveAvatarConf user={user} setOpenModal={setOpenModal} />}
        </>
    )
}
