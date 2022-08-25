import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import './LandingPage.css'

export default function LandingPage() {


    return (
        <div className='slashPage'>
        <div className="main-container-login">
            <div className="login-form-and-image-container">
                <div className="image-container">
                    <img className='splash-image' src='https://thumbs.dreamstime.com/z/instagram-post-template-apple-iphone-kyiv-ukraine-april-instagram-post-template-apple-iphone-instagram-post-mockup-perfect-216413582.jpg' alt='' />
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
                </div>
            </div>
        </div>
    </div>
    )
}
