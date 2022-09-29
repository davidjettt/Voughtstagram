import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ProfileSettings.css'
import { useState } from 'react'
import UpdateAvatarModal from './UpdateAvatarModal'
import { updateUserSettingsThunk } from '../../store/users'
import { updateSessionUserSettings } from '../../store/session'


export default function ProfileSettings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const defaultProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const sessionUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[sessionUser.id])
    // const user = users[+sessionUser.id]
    // const allEmails = Object.values(users).filter(user => +user.id !== +sessionUser.id).map(user => user.email)
    // const allUsernames = Object.values(users).filter(user => +user.id !== +sessionUser.id).map(user => user.username)
    const [name, setName] = useState(user?.name || '')
    const [username, setUsername] = useState(user?.username || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [email, setEmail] = useState(user?.email || '')
    const [errors, setErrors] = useState([])
    const [count, setCount] = useState(0)

    const handleTextareaChange = (e) => {
        setCount(e.target.value.length)
        setBio(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        // FRONT END VALIDATIONS TO VALIDATE EXISTING EMAIL AND USERNAME MINUS CURRENT USER
        // if (allEmails.includes(email) && allUsernames.includes(username)) {
        //     setErrors(['Email address is already in use', 'Username is already in use'])
        // }
        // else if (allUsernames.includes(username)) {
        //     setErrors(['Username is already in use'])
        // }
        // else if (allEmails.includes(email)) {
        //     setErrors(['Email address is already in use'])
        // }
        // else {
        // }
        if (sessionUser.id === 1 && (email !== 'demo@aa.io' || username !== 'Demo')) {
            setErrors(['You cannot change the email or username of the demo user'])
        }
        else {
            const payload = {
                ...user,
                name,
                username,
                bio,
                email
            }
            const data = await dispatch(updateUserSettingsThunk(payload))
            if (data.errors) {
                setErrors(data.errors)
            } else {
                await dispatch(updateSessionUserSettings(data))
                history.push(`/users/${user.id}`)
            }
        }
    }

    return (
        <>
            <div className='profile-settings-main'>
                <div className='profile-settings-container'>
                    <div className='profile-settings-left'>
                        <button className='edit-profile-left'>Edit profile</button>
                    </div>
                    <div className='profile-settings-right'>
                        {user &&
                            <div className='avatar-username-container'>
                                <img style={{ width: 40, height: 40 }} className='settings-avatar' src={user.avatar || defaultProfilePic} alt='avatar' />


                                <div className='avatar-username-left'>
                                    <div>{user.username}</div>

                                    <UpdateAvatarModal user={user} />
                                </div>
                            </div>
                        }
                        <div className='errors'>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className='profile-settings-form'>
                            <div className='settings-name-container'>
                                <label className='settings-name-label'>
                                    Name
                                </label>
                                <input
                                    className='settings-input'
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='settings-name-description'>
                                <div style={{ width: 100, display: 'flex', justifyContent: 'center' }}></div>
                                <div className='settings-description'>
                                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                </div>
                            </div>
                            <div className='settings-username-container'>
                                <label className='settings-username-label'>
                                    Username
                                </label>
                                <input
                                    className='settings-input'
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='settings-bio-container'>
                                <label className='settings-bio-label'>
                                    Bio
                                </label>
                                <div>
                                    <textarea
                                        className='bio-input'
                                        rows={3}
                                        value={bio}
                                        // onChange={(e) => setBio(e.target.value)}
                                        onChange={handleTextareaChange}
                                        maxLength={150}
                                    />
                                    <div className='bio-count' >{count} / 150</div>
                                </div>
                            </div>
                            <div className='settings-email-container'>
                                <label className='settings-email-label'>
                                    Email
                                </label>
                                <input
                                    className='settings-input'
                                    type='text'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button className='user-settings-btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
