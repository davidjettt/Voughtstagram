import { useState } from 'react'
import { useDispatch } from 'react-redux'
import RemoveAvatarConf from './RemoveAvatarConf'

import './UpdateAvatar.css'


export default function UpdateAvatar({ user, setOpenModal }) {
    const dispatch = useDispatch()
    const [ openConf, setOpenConf ] = useState(false)

    const handleAvatarUpload = () => {
        // calls dispatch to add avatar url to db
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
            {openConf && <RemoveAvatarConf setOpenModal={setOpenModal} />}
        </>
    )
}
