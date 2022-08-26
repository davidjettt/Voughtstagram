import { useDispatch, useSelector } from "react-redux"
import { unfollowThunk, followThunk } from "../../store/users"
import followingIcon from '../../Images/followingicon.svg'
import './FollowButton.css'


export default function FollowButton({ profileUserId, following }) {

    const dispatch = useDispatch()

    const sessionUserId = useSelector(state => state.session.user.id)
    let followButton

    function handleFollow() {
        following ?
            dispatch(unfollowThunk(profileUserId)) :
            dispatch(followThunk(profileUserId))
    }

    following ?
        followButton = (
            <button className="following-button" onClick={handleFollow}>
                <div className="following-image-container">
                    <img className="following-image" src={followingIcon}></img>
                </div>
            </button>
        ) :
        followButton = (
            <button className="not-following-button" onClick={handleFollow}>
                Follow
            </button>
        )




    return (
        <>
            {
                profileUserId !== sessionUserId &&
                followButton
            }
        </>
    )
}
