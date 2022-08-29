import React from 'react';
import './footer.css'
import { Link, NavLink } from 'react-router-dom';
import githubLogo from '../../Images/github-logo.svg'
import linkedinLogo from '../../Images/linkedin-logo.svg'

const Footer = () => {

    return (
        <div className='footer-container'>
            <div className='technologies-used'>
                <ul className='technologies-used-list'>
                    <div className='footer-li'><li>Python</li></div>
                    <div className='footer-li'><li>React</li></div>
                    <div className='footer-li'><li>Redux</li></div>
                    <div className='footer-li'><li>Flask</li></div>
                    <div className='footer-li'><li>SQLAlchemy</li></div>
                    <div className='footer-li'><li>Docker</li></div>
                    <div className='footer-li'><li>HTML</li></div>
                    <div className='footer-li'><li>CSS</li></div>
                    <div className='footer-li'><li>Javascript</li></div>

                </ul>
            </div>
            <div className='team-members-footer'>
                <div className='joon-footer'>
                    <p>Joon Bae</p>
                    <a target='_blank' href='https://www.github.com/Joon-Bae'>
                        <div>
                        <img className='github-logo' src={githubLogo}/>
                        </div>
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/in/joon-bae-b06a84199/'>
                        <div>
                        <img className='linkedin-logo' src={linkedinLogo}/>
                        </div>
                    </a>
                </div>
                <div className='david-footer'>
                    <p>David Jetsupphasuk</p>
                    <a target='_blank' href='https://github.com/davidjettt'>
                        <div>
                        <img className='github-logo' src={githubLogo}/>
                        </div>
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/in/david-jetsupphasuk-1494a6125/'>
                        <div>
                        <img className='linkedin-logo' src={linkedinLogo}/>
                        </div>
                    </a>
                </div>
                <div className='allan-footer'>
                    <p>Allan Yang</p>
                    <a target='_blank' href='https://github.com/ayang740'>
                        <div>
                        <img className='github-logo' src={githubLogo}/>
                        </div>
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/in/allan-yang-46a31624a/'>
                        <div>
                        <img className='linkedin-logo' src={linkedinLogo}/>
                        </div>
                    </a>
                </div>
                <div className='zach-footer'>
                    <p>Zach Hoschar</p>
                    <a target='_blank' href='https://github.com/hoscharzach'>
                        <div>
                        <img className='github-logo' src={githubLogo}/>
                        </div>
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/in/zach-hoschar-3ab403b8/'>
                        <div>
                        <img className='linkedin-logo' src={linkedinLogo}/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
