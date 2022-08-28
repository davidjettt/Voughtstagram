import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Feed from "./PostFeed";
import './post.css'


export default function MyFeed() {
    const userId = useSelector(state => state.session.user.id)
    const posts = useSelector(state => state.posts.normalizedPosts)
    const users = useSelector(state => state.users)


    const [myPosts, setMyPosts] = useState([])
    const [noFollows, setNoFollows] = useState(false)

    useEffect(() => {
        setNoFollows(users[userId].following.length === 0)
        setMyPosts(Object.values(posts).filter(el => users[userId].following.includes(el.userId)))
    }, [userId, posts, users])

    return (
        <>
            {!noFollows &&
                <Feed posts={myPosts} />}

            {noFollows &&
                <div className="no-follows-container">
                    <div className="empty-">You don't seem to be following anyone, check out the <strong><Link to="/feed">main feed</Link></strong> to find some content that you like.</div>
                </div>}
        </>
    )
}
