import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
import logo from '../../Images/voughtstagramlogo.svg'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log(data)
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <div className='login-form-container-main'>
      <div className='login-title-container'>
        <img className='voughtstagram-logo' src={logo} />
      </div>
      <form className='login-form' onSubmit={onLogin}>
        <div className='email-container'>
          <label className='custom custom-login' htmlFor='email'>
            <input
              className='input-login'
              name='email'
              type='text'
              required
              value={email}
              onChange={updateEmail}
            />
            <span className='placeholder placeholder-login'>Email</span>
          </label>
        </div>
        <div className='password-container'>
          <label className='custom custom-login' htmlFor='password'>
          <input
            required
            className='input-login'
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
          <span className='placeholder placeholder-login'>Password</span>
          </label>
        </div>
        <button className='login-button' type='submit' disabled={email.length < 1 || password.length < 1}>Log In</button>
        <div className='login-or'>
          <div className='login-line'></div>
          <div className='login-or-word'>OR</div>
          <div className='login-line'></div>
        </div>
        <div className='demo-user-container'>
          <button onClick={handleDemoUser} className='login-button'>Demo User</button>
        </div>
        <div style={{ marginTop: 20 }} className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
