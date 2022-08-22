import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllPosts } from "../../store/posts"
import './post.css'

export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => state.posts.normalizedPosts)

    let visiblePosts

    if (!sessionUser) {
        return (
        <>
        {Object.values(allPosts).map(el => (
                <div key={el.id}>{el.description}</div>
            ))}
        </>
    )


    } else {
        // this code is same as above to prevent errors, but should only show posts
        // from users that the current user follows
        visiblePosts = {...allPosts}
        return (
            <div>
            {Object.values(visiblePosts).map(post => (
                <NavLink to={`/feed/${post.id}`} key={post.id}>
                    <img src={post.imageUrl} alt=" "></img>
                    <div>{post.description}</div>
                </NavLink>

                ))}
            </div>
        )
    }

}
