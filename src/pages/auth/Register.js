import React, { useState } from 'react';
import './auth.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//validations
import {
  emailvalid,
  usernamevalid,
  phonenumbervalid,
  passwordvalid,
} from '../../utilts/formvalidations';

//router
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authReducer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //error state
  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [phonenumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //router navigate
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  //inputs handling
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterationForm = () => {
    if (!usernamevalid.test(username)) {
      setUserNameError('Please enter Letters only ');
      return;
    } else {
      setUserNameError('');
    }

    if (phonenumber.length !== 10) {
      setPhoneNumberError('Please enter 10 digits');
      return;
    } else if (!phonenumbervalid.test(phonenumber)) {
      setPhoneNumberError('Please enter corrrect number');
      return;
    } else {
      setPhoneNumberError('');
    } 

    if (!emailvalid.test(email)) {
      setEmailError('It is not an email, please enter properly');
      return;
    } else {
      setEmailError('');
    }

    if (!passwordvalid.test(password)) {
      setPasswordError('It contains min 6 letters & 1 spec character');
      return;
    } else {
      setPasswordError('');
    }

    dispatch(
      registerUser({
        username: username,
        email: email,
        password: password,
        phonenumber: phonenumber,
      })
    );

    navigate('/auth');
  };

  return (
    <div className='auth_conatiner'>
      <div className='inputs_conatiner'>
        <h1>Register</h1>
        <TextField
          type='text'
          size='small'
          placeholder='username'
          name='username'
          value={username}
          onChange={handleUsername}
        />
        {userNameError && (
          <span style={{ fontSize: '10px', color: 'red' }}>
            {userNameError}
          </span>
        )}
        <TextField
          type='number'
          size='small'
          placeholder='phonenumber'
          name='phonenumber'
          value={phonenumber}
          onChange={handlePhonenumber}
        />
        {phonenumberError && (
          <span style={{ fontSize: '10px', color: 'red' }}>
            {phonenumberError}
          </span>
        )}
        <TextField
          type='email'
          size='small'
          placeholder='email'
          name='email'
          value={email}
          onChange={handleEmail}
        />
        {emailError && (
          <span style={{ fontSize: '10px', color: 'red' }}>{emailError}</span>
        )}
        <TextField
          type='password'
          size='small'
          placeholder='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        {passwordError && (
          <span style={{ fontSize: '10px', color: 'red' }}>
            {passwordError}
          </span>
        )}
        <Button
          variant='contained'
          onClick={handleRegisterationForm}
        >
          Register
        </Button>
        <span style={{ marginTop: '20px' }}>
          Do You Have an account?
          <Link
            to='/auth'
            className='link'
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
