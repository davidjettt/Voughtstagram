import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import './followmodal.css'
import FollowButton from "../FollowButton"
import defaultProfilePic from '../../../Images/defaultprofilepic.svg'
import x from '../../../Images/modalx.svg'


export default function ShowFollows({ type, setShowModal }) {
    const { userId } = useParams()
    const profileUser = useSelector(state => state.users[Number(userId)])
    const sessionUserId = useSelector(state => state.session.user.id)
    const sessionUser = useSelector(state => state.users[sessionUserId])
    const users = useSelector(state => state.users)

    const [following, setFollowing] = useState(false)
    const [displayItems, setDisplayItems] = useState([])
    const [header, setHeader] = useState('')

    useEffect(() => {
        setFollowing(sessionUser.following.includes(profileUser.id))
    }, [sessionUser, profileUser])

    useEffect(() => {
        if (type === 'followers') {
            setDisplayItems(profileUser?.followers)
            setHeader('Followers')
        } else {
            setDisplayItems(profileUser?.following)
            setHeader('Following')
        }
    }, [profileUser, type])

    return (
        <div className="main-follows-container">
            <div className="follows-container-header">
                <div>
                    <div className="follows-container-title">{header}</div>
                </div>
                <div className="close-modal-x">
                    <button onClick={() => setShowModal(false)} className="x"><img src={x}></img></button>
                </div>
            </div>
            <div className="follow-cards-container">
                {displayItems &&
                    displayItems.map(user => (
                        <div key={user} className="follow-card">
                            <div className="follow-card-pic">
                                <Link to={`/users/${user}`}>
                                    <img onClick={() => setShowModal(false)} className="follow-card-avatar" src={users[user].avatar || defaultProfilePic} alt=""></img>
                                </Link>
                            </div>
                            <div className="follow-card-name-container">
                                <Link to={`/users/${user}`}>
                                    <div onClick={() => setShowModal(false)} className="follow-card-username">{users[user].username}</div>
                                </Link>
                                <div className="follow-card-real-name">{users[user].name || users[user].username}</div>
                            </div>
                            {sessionUserId !== user &&
                                <FollowButton modal={true} profileUserId={user} following={sessionUser.following.includes(user)} />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
