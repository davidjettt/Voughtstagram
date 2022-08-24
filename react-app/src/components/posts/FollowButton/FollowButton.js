import { useDispatch } from 'react-redux'
import followingButton from '../../../Images/followingicon.svg'
import { followThunk, unfollowThunk } from '../../../store/users'

export default function FollowButton({following, userId, setFollowing}) {
    const dispatch = useDispatch()

    let displayButton

    function handleFollow() {
        if (following) {
            dispatch(unfollowThunk(userId))
            setFollowing(false)
         } else {
            dispatch(followThunk(userId))
            setFollowing(true)
         }
    }

    if (following) {
        displayButton = (
            <button onClick={handleFollow}><img src={followingButton} alt="" ></img></button>
        )
    } else {
        displayButton = (
            <button onClick={handleFollow}>Not Following</button>
        )
    }

    return (
        <div>
            {displayButton}
        </div>
    )
}
