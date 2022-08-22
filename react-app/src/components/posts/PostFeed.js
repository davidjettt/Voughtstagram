import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "../../store/posts"

export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => state.posts.normalizedPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    let visiblePosts

    if (!sessionUser) {
        visiblePosts = {...allPosts}
        return (
            <div>
            {Object.values(visiblePosts).map(post => (
                <div key={post.id}>
                    <img src={post.imageUrl} alt="" ></img>
                    <div>{post.description}</div>
                </div>
                ))}
            </div>
        )

    } else {
        // this code is same as above to prevent errors, but should only show posts
        // from users that the current user follows
        visiblePosts = {...allPosts}
        console.log(visiblePosts, "logged in posts")
        return (
            <div>
            {Object.values(visiblePosts).map(post => (
                <div key={post.id}>
                    <img src={post.imageUrl} alt=" "></img>
                    <div>{post.description}</div>
                </div>

                ))}
            </div>
        )
    }

}
