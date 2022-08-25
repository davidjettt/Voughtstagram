import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './followmodal.css'


export default function ShowFollows({type}) {
    const { userId } = useParams()
    const profileUser = useSelector(state => state.users[Number(userId)])
    const users = useSelector(state => state.users)

    const [displayItems, setDisplayItems] = useState([])
    const [header, setHeader] = useState('')

    useEffect(() => {
        if (type === 'followers') {
            setDisplayItems(profileUser?.followers)
            setHeader('Followers')
        } else {
            setDisplayItems(profileUser?.following)
            setHeader('Following')
        }
    }, [profileUser])

    return (
        <div className="main-follows-container">
            <div className="follows-container-header">
                <h3>{header}</h3>
            </div>
            <div className="follow-cards-container">
                {
                    displayItems &&
                    displayItems.map(userId => (
                        <div className="follow-card" key={userId}>
                            <div className="follow-card-pic">Profile Pic</div>
                            <div className="follow-card-name-container">
                                <div>{users[userId].username}</div>
                                <div>real name</div>
                            </div>
                            <div className="follow-card-button">Follow Button</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
