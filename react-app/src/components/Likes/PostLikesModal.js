import { useEffect, useState } from 'react'
import { Modal } from '../../context/Modal'
import PostLikesUsers from './PostLikesUsers'


export default function PostLikesModal({ post }) {
    const [ showLikesModal, setShowLikesModal ] = useState(false)
    // const [ className, setClassName ] = useState('')
    // const [renderModal, setRenderModal] = useState(false)

    // useEffect(() => {
    //     if (post.userLikes.length > 0) {
    //         setClassName('number-likes-cursor')
    //     } else {
    //         setClassName('number-likes')

    //     }
    // },[post.userLikes.length])

    const handleLikesModal = () => {
        setShowLikesModal(true)
    }

    return (
        <>
            {post.userLikes.length == 0 && <p className='number-likes'>{post.userLikes.length} likes</p>}
            {post.userLikes.length > 0 && <p onClick={handleLikesModal} className='number-likes-cursor'>{post.userLikes.length} likes</p>}
            {showLikesModal && <Modal onClose={() => setShowLikesModal(false)}>
                <PostLikesUsers post={post} setShowLikesModal={setShowLikesModal} />
            </Modal>}
        </>
    )
}
