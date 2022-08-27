import { useDispatch, useSelector } from "react-redux"
import { unfollowThunk, followThunk } from "../../store/users"
import followingIcon from '../../Images/followingicon.svg'
import './FollowButton.css'


export default function FollowButton({  modal, profileUserId, following }) {
    const dispatch = useDispatch()

    const sessionUserId = useSelector(state => state.session.user.id)
    let followButton

    function handleFollow() {
        following ?
            dispatch(unfollowThunk(profileUserId)) :
            dispatch(followThunk(profileUserId))
    }
    let className
    if (modal && following) className = 'modal-following-button'
    else if (!modal && following) className = 'following-button'
    else className = 'not-following-button'

    following ?
        followButton = (
            <>
                {modal &&
                    <button className={className} onClick={handleFollow}>Following</button>}

                {!modal &&
                    <button className={className} onClick={handleFollow}>
                        <div className="following-image-container">
                            <img className="following-image" src={followingIcon}></img>
                        </div>
                    </button>}
            </>
        ) :
        followButton = (
            <button className={className} onClick={handleFollow}>
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
