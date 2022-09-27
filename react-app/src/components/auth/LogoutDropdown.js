import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import profileButton from '../../../src/Images/profilebutton.svg'
import logoutButton from '../../../src/Images/logout-icon.svg'
import settingsIcon from '../../../src/Images/settings-icon.svg'
import "./ProfileDropdown.css";

const LogoutDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userAvatar = useSelector((state) => state.session.user.avatar);
  const userId = useSelector((state) => state.session.user.id);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <div className='menu-wrapper'>
        <button className="user-avatar-button" onClick={openMenu}>
          <img className="user-avatar" src={userAvatar || 'https://nitreo.com/img/igDefaultProfilePic.png'}></img>
        </button>

        {showMenu && (
      <div className="dropdown-div">
          <div className="dropdown-menu">
            <ul className="profile-dropdown">
              <div className='dropdown-first-part'>
              <img className='profile-icon' src={profileButton}/>
              <NavLink className="link-to-profile" to={`/users/${userId}`}>
                <li className='text-to-profile'>Profile</li>
              </NavLink>
              <Link className="link-to-settings" to={`/account/settings`}>
                <img src={settingsIcon}  alt='settings' />
                Settings
              </Link>
              </div>
              <div>
                <img className='log-out-icon' src={logoutButton}/>
                <li className='text-to-logout'onClick={onLogout}>Logout</li>
              </div>
            </ul>
          </div>
      </div>
        )}
  </div>
    </>
  );
};

export default LogoutDropdown;
