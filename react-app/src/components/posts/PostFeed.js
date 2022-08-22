// import { useSelector } from "react-redux"

// export default function Feed() {
//     const sessionUser = useSelector(state => state.session.user)
//     const allPosts = useSelector(state => state.posts.normalizedPosts)

//     let visiblePosts

//     if (!sessionUser) {
//         visiblePosts = {...allPosts}
//         return (
//             <div>
//             {Object.values(visiblePosts).map(post => (
//                 <>
//                 <div>{post.imageUrl}</div>
//                 <div>{post.description}</div>
//                 </>
//                 ))}
//             </div>
//         )

//     } else {
//         // this code is same as above to prevent errors, but should only show posts
//         // from users that the current user follows
//         visiblePosts = {...allPosts}
//         return (
//             <div>
//             {Object.values(visiblePosts).map(post => (
//                 <>
//                 <img src={post.imageUrl} alt=" "></img>
//                 <div>{post.description}</div>
//                 </>
//                 ))}
//             </div>
//         )
//     }

// }
