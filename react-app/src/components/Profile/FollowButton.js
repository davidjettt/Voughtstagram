import { useDispatch, useSelector } from "react-redux"
import { unfollowThunk, followThunk } from "../../store/users"

export default function FollowButton({profileUserId, following}) {

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
        <button onClick={handleFollow}>
            {/* <img src={followingIcon}></img> */}
            Following
        </button>
        ) :
    followButton = (
        <button className="not-following-button" onClick={handleFollow}>
            Not Following
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
