import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FollowButton from "../Profile/FollowButton";
import x from '../../Images/modalx.svg'
import defaultProfilePic from '../../Images/defaultprofilepic.svg'


export default function PostLikesUsers({ post, setShowLikesModal }) {
    const userLikes = post.userLikes
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const currUser = users[sessionUser.id]


    return (
        <div className="main-follows-container">
        <div className="follows-container-header">
            <div>
                <div className="follows-container-title">Likes</div>
            </div>
            <div className="close-modal-x">
                <button onClick={() => setShowLikesModal(false)} className="x"><img src={x}></img></button>
            </div>
        </div>
        <div className="follow-cards-container">
            {userLikes &&
                userLikes.map(user => (
                    <div key={user} className="follow-card">
                        <div className="follow-card-pic">
                            <Link to={`/users/${user}`}>
                                <img onClick={() => setShowLikesModal(false)} className="follow-card-avatar" src={users[user].avatar || defaultProfilePic} alt=""></img>
                            </Link>
                        </div>
                        <div className="follow-card-name-container">
                            <Link to={`/users/${user}`}>
                                <div onClick={() => setShowLikesModal(false)} className="follow-card-username">{users[user].username}</div>
                            </Link>
                            <div className="follow-card-real-name">real name</div>
                        </div>
                        {currUser.id !== user &&
                            <FollowButton modal={true} profileUserId={user} following={currUser.following.includes(user)} />}
                    </div>
                ))
            }
        </div>
    </div>
    )
}
