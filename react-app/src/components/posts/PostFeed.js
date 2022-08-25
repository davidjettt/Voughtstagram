import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import './post.css'
import Cards from "./Cards"
import { useEffect } from "react"
import { loadAllUsers } from "../../store/users"

export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => Object.values(state.posts.normalizedPosts))
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadAllUsers())
    }, [])


    if (!sessionUser) {
        return (
        <Redirect to='/' />
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
