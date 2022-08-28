import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
import Footer from '../footer/footer.js'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const nameInput = document.querySelector('.signup-name-input-field')
    nameInput.addEventListener('blur', (e) => {
      if (e.target.value) {
        e.target.classList.add('no-focus')
      } else {
        e.target.classList.remove('no-focus')
      }
    })
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords need to match'])
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <div className='signup-page-main'>
      <div className='signup-form-container'>
        <div className='signup-title-container'>
          <h1>Voughtstagram</h1>
          <div className='signup-message'>Sign up to see photos and videos from your friends.</div>
        </div>
        <form className='signup-form' onSubmit={onSignUp}>
          <div>
            <label className='custom'>
              <input
                className='signup-name-input-field'
                required
                type='text'
                name='name'
                onChange={updateName}
                value={name}
              />
              <span className='placeholder'>Name</span>
            </label>
          </div>
          <div>
            <label className='custom'>
            <input
              required
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            />
            <span className='placeholder'>Username</span>
            </label>
          </div>
          <div>
            <label className='custom'>
            <input
              required
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
            <span className='placeholder'>Email</span>
            </label>
          </div>
          <div>
            <label className='custom'>
            <input
              required
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
            <span className='placeholder'>Password</span>
            </label>
          </div>
          <div>
            <label className='custom'>
            <input
              required
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            />
            <span className='placeholder'>Repeat Password</span>
            </label>
          </div>
          <button className='login-button' type='submit' disabled={username.length < 1 || email.length < 1 || password.length < 1 || repeatPassword < 1}>Sign Up</button>
          <div className='signup-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </form>
      </div>
      <div className='back-to-login-container'>
        <div>
          Have an account?
          <NavLink className='signup-link' to='/'> Log In</NavLink>
        </div>
      </div>
      <div className='signup-footer'>
        <Footer/>
      </div>
    </div>
  );
};

export default SignUpForm;
