import { useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import './post.css'
import Cards from "./Cards"

export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => Object.values(state.posts.normalizedPosts))


    if (!sessionUser) {
        return (
        <Redirect to='/login' />
        )
    }

    return (
        <div className="feed-container">
            <div className="main-posts-container">
                {allPosts.map(post => (
                    <Cards key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}
