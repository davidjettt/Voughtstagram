import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import './LandingPage.css'
import twoPhones from '../../Images/twophones.png'
import Footer from "../footer/footer";
import screenShot1 from '../../Images/screenshot1.png'
import screenShot2 from '../../Images/screenshot2.png'
import screenShot3 from '../../Images/screenshot3.png'
import githubLogo from '../../Images/github-logo.svg'
import { useEffect, useState } from "react";


export default function LandingPage() {

    const images = [screenShot1, screenShot2, screenShot3]

    const [image, setImage] = useState(images[0])
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setImage(images[counter])
    }, [counter])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((counter) => counter === 2 ? 0 : counter + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='slashPage'>
            <div className="main-container-login">
                <div className="login-form-and-image-container">
                    <div className="image-container">
                        <img className='splash-image' src={twoPhones} alt='' />
                        <img className='phone-image' src={image} />
                    </div>
                    <div className="title-form-signup-container">
                        <div className="form-container">
                            <LoginForm />
                        </div>
                        <div className="signup-container">
                            <div>
                                Don't have an account?
                                <NavLink className='signup-link' to='/sign-up'> Sign Up</NavLink>
                            </div>
                        </div>
                        <div className='landing-project-repo'>
                            Check out the project repo here
                            <a target='_blank' href='https://github.com/Joon-Bae/Voughtstagram'>
                                <img className='project-repo-image' src={githubLogo} />
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
