import { useSelector } from "react-redux"
import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"

export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => state.posts.normalizedPosts)

    let visiblePosts

    if (!sessionUser) {
        visiblePosts = {...allPosts}
        return (
            <div>
            {Object.values(visiblePosts).map(post => (
                <div key={post.id}>
                    <img src={post.imageUrl}></img>
                    <div>{post.description}</div>
                </div>
                ))}
            </div>
        )

    } else {
        // this code is same as above to prevent errors, but should only show posts
        // from users that the current user follows
        visiblePosts = {...allPosts}
        return (
            <div>
            {Object.values(visiblePosts).map(post => (
                <div key={post.id}>
                    <img src={post.imageUrl} alt=" "></img>
                    <div>{post.description}</div>
                    <Comments />
                    <CommentForm postId={post.id} />
                </div>

                ))}
            </div>
        )
    }

}
