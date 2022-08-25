import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './followmodal.css'
import FollowButton from "../FollowButton"


export default function ShowFollows({ type }) {
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
    }, [profileUser])

    return (
        <div className="main-follows-container">
            <div className="follows-container-header">
                <div>
                    <div>{header}</div>
                </div>
            </div>
            <div className="follow-cards-container">
                {
                    displayItems &&
                    displayItems.map(user => (
                        <div className="follow-card" key={user}>
                            <div className="follow-card-pic">
                                {user.avatar || 'Profile Pic'}
                            </div>
                            <div className="follow-card-name-container">
                                <div>{users[user].username}</div>
                                <div>real name</div>
                            </div>
                            {sessionUserId !== user &&
                                <FollowButton profileUserId={Number(userId)} following={following} />}

                        </div>
                    ))
                }
            </div>
        </div>
    )
}
