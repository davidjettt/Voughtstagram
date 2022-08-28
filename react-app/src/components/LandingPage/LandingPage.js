import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import './LandingPage.css'
import twoPhones from '../../Images/twophones.png'
import Footer from "../footer/footer";
import screenShot1 from '../../Images/screenshot1.png'
import githubLogo from '../../Images/github-logo.svg'


export default function LandingPage() {


    return (
        <div className='slashPage'>
        <div className="main-container-login">
            <div className="login-form-and-image-container">
                <div className="image-container">
                    <img className='splash-image' src={twoPhones} alt='' />
                    <img className='phone-image' src={screenShot1}/>
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
                           <a href='https://github.com/Joon-Bae/Voughtstagram'>
                            <img className='project-repo-image' src={githubLogo}/>
                           </a>
                        </div>
                </div>
            </div>
        <Footer/>
        </div>
    </div>
    )
}
