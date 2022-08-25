import { useSelector } from "react-redux"


export default function ShowFollows({type, profileUser}) {
    const users = useSelector(state => state.users)

    let displayItems

    type === 'followers' ?
    displayItems = (
        profileUser &&
        profileUser.followers.map(el => (
            <p key={el}>User: {users[el].username}</p>
        ))
    ) :
    displayItems = (
        profileUser &&
        profileUser.following.map(el => (
            <p key={el}>User: {users[el].username}</p>
        ))
    )

    return (
        <div className="follows-container">
            {displayItems}
        </div>
    )
}
