import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Feed from "./PostFeed";
import defaultProfile from '../../../src/Images/defaultprofilepic.svg'

import './post.css'

export default function MyFeed() {
    const userId = useSelector(state => state.session.user.id)
    const posts = useSelector(state => state.posts.normalizedPosts)
    const users = useSelector(state => state.users)

    const usersList = Object.values(users)
    const userIds = usersList.map(usersList => usersList.id)
    let ranIds = []
    let i = userIds.length
    let j = 0

    while (i--) {
        j = Math.floor(Math.random() * (i));
        ranIds.push(userIds[j]);
        userIds.splice(j,1);
    }

    const [myPosts, setMyPosts] = useState([])
    const [noFollows, setNoFollows] = useState(false)

    useEffect(() => {
        setNoFollows(users[userId].following.length === 0)
        setMyPosts(Object.values(posts).filter(el => users[userId].following.includes(el.userId)).reverse())
    }, [userId, posts, users])

    return (
        <>
            {!noFollows &&
                <Feed posts={myPosts} />}

            {noFollows &&
                <div className="no-follows-container">
                    {/* <div className="empty-">You don't seem to be following anyone, check out the <strong><Link to="/feed">main feed</Link></strong> to find some content that you like.</div> */}
                    <div>
                        <div className="suggested-users">You don't seem to be following anyone, here are some suggested users to follow.</div>
                        <Link to={`/users/${usersList[ranIds[0]]?.id}`} className="suggested-user-link">
                            <img className="suggested-user-image" src={usersList[ranIds[0]]?.avatar || defaultProfile} alt=''></img>
                            <div>{usersList[ranIds[0]]?.username}</div>
                        </Link>
                        <Link to={`/users/${usersList[ranIds[1]]?.id}`} className="suggested-user-link">
                            <img className="suggested-user-image" src={usersList[ranIds[1]]?.avatar || defaultProfile} alt=''></img>
                            <div>{usersList[ranIds[1]]?.username}</div>
                        </Link>
                        <Link to={`/users/${usersList[ranIds[2]]?.id}`} className="suggested-user-link">
                            <img className="suggested-user-image" src={usersList[ranIds[2]]?.avatar || defaultProfile} alt=''></img>
                            <div>{usersList[ranIds[2]]?.username}</div>
                        </Link>
                        <Link to={`/users/${usersList[ranIds[3]]?.id}`} className="suggested-user-link">
                            <img className="suggested-user-image" src={usersList[ranIds[3]]?.avatar || defaultProfile} alt=''></img>
                            <div>{usersList[ranIds[3]]?.username}</div>
                        </Link>
                        <Link to={`/users/${usersList[ranIds[4]]?.id}`} className="suggested-user-link">
                            <img className="suggested-user-image" src={usersList[ranIds[4]]?.avatar || defaultProfile} alt=''></img>
                            <div>{usersList[ranIds[4]]?.username}</div>
                        </Link>
                    </div>
                </div>}
        </>
    )
}
