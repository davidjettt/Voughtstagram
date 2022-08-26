import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import './post.css'
import Cards from "./Cards"
import { useEffect } from "react"
import { loadAllUsers } from "../../store/users"
import joonProfile from '../../Images/team-members/joonprofile.jpg'
import zachProfile from '../../Images/team-members/zachprofile.jpg'
import davidProfile from '../../Images/team-members/davidprofile.png'
import allanProfile from '../../Images/team-members/allanprofile.jpg'
import linkedinLogo from '../../Images/linkedin-logo.svg'
import githubLogo from '../../Images/github-logo.svg'
import profileButton from '../../Images/profilebutton.svg'


export default function Feed() {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => Object.values(state.posts.normalizedPosts).reverse())
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.session.user.id);
    const userAvatar = useSelector((state) => state.session.user.avatar);


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
            <div className='main-post-parent'>
                <div className="main-posts-container">
                {allPosts.map(post => (
                    <Cards key={post.id} post={post}/>
                ))}
                </div>
                <div className="team-members-feed">
                    <div className='user-avatar-feed'>
                        <div>
                        <img className='profile-icon-feed' src={userAvatar}/>
                    </div>
                    <div>
                    <NavLink className="link-to-profile" to={`/users/${userId}`}>
                    <p className='username-feed'>{sessionUser.username}</p>
                    </NavLink>
                    </div>
              </div>
                    <div>
                        <p className='suggested-text'>Suggested members to hire :)</p>
                    </div>
                    <div className='joon-feed'>
                        <div className='joon-profile-feed'>
                        <img className='joon-pic' src={joonProfile}/>
                        <p className='name-text1'>Joon Bae</p>
                        </div>

                        <div className='links-to-sites-feed'>
                            <div>
                            <a href='https://www.github.com/Joon-Bae'>
                            <img className='github-logo' src={githubLogo}/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.linkedin.com/in/joon-bae-b06a84199/'>
                            <img className='linkedin-logo' src={linkedinLogo}/>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className='zach-feed'>
                        <div className='zach-profile-feed'>
                        <img className='zach-pic' src={zachProfile}/>
                        <p className='name-text2'>Zach Hoschar</p>
                        </div>

                        <div className='links-to-sites-feed'>
                            <div>
                            <a href='https://github.com/hoscharzach'>
                            <img className='github-logo' src={githubLogo}/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.linkedin.com/in/zach-hoschar-3ab403b8/'>
                            <img className='linkedin-logo' src={linkedinLogo}/>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className='david-feed'>
                        <div className='david-profile-feed'>
                        <img className='david-pic' src={davidProfile}/>
                        <p className='name-text3'>David Jetsupphasuk</p>
                        </div>

                        <div className='links-to-sites-feed'>
                            <div>
                            <a href='https://github.com/davidjettt'>
                            <img className='github-logo' src={githubLogo}/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.linkedin.com/in/david-jetsupphasuk-1494a6125/'>
                            <img className='linkedin-logo' src={linkedinLogo}/>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className='allan-feed'>
                        <div className='allan-profile-feed'>
                        <img className='allan-pic' src={allanProfile}/>
                        <p className='name-text4'>Allan Yang</p>
                        </div>

                        <div className='links-to-sites-feed'>
                            <div>
                            <a href='https://github.com/ayang740'>
                            <img className='github-logo' src={githubLogo}/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.linkedin.com/in/allan-yang-46a31624a/'>
                            <img className='linkedin-logo' src={linkedinLogo}/>
                            </a>
                        </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}
