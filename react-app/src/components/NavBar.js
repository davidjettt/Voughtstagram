
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutDropdown from './auth/LogoutDropdown';
import navLogo from '../Images/voughtstagramlogo.svg'
import homeLogo from '../Images/homelogo.svg'
import newPost from '../Images/createpost.svg'
import './Profile/NavBar.css'
import CreatePostModal from './posts/CreatePostModal/CreatePostModal';

const NavBar = () => {
  return (
      <div className='nav-bar-container' >
        <div className='inner-nav-container'>
        <div className="nav-logo">
          <NavLink className='home-link' exact to='/feed'>
            <img className="home-logo" src={navLogo}/>
          </NavLink>
        </div>
      {/* <ul> */}
      <div className='nav-buttons-right'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='house-logo'>
           <img  src={homeLogo}/>
          </div>
          </NavLink>

        {/* <li>
          <NavLink to='/feed' exact={true} activeClassName='active'>
            My Feed
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {/* <NavLink to='/posts/new' exact={true} activeClassName='active'>
            <img className='new-post-button' src={newPost}/>
          </NavLink> */}
          <CreatePostModal />
          <LogoutDropdown />
        </div>
        </div>
      {/* </ul> */}
      </div>

  );
}

export default NavBar;
