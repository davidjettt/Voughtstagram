import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'


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
        <h1>Voughtstagram</h1>
      </div>
      <form className='login-form' onSubmit={onLogin}>
        {/* <div className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div className='email-container'>
          <label className='custom' htmlFor='email'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            {/* <span className='placeholder'>Email</span> */}
          </label>
        </div>
        <div className='password-container'>
          <label htmlFor='password'></label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
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
