import React from 'react';
import { useState } from 'react';
import './auth.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useFetch from '../../hooks/useFetch';

//router
import { Link, useNavigate } from 'react-router-dom';

//redux reduers
import { loginUser, logoutUser } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  //STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //login error message
  const [loginDetailsWrong, setLoginDetailsWrong] = useState(false);

  //redux
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, loginDetails, users } = auth;

  //router
  const navigate = useNavigate();

  //INPUTS HABDLING
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const SubmitLogin = () => {
    const loginUserTrue = users.find(
      (eachuser) =>
        eachuser.username === username && eachuser.password === password
    );
    if (!loginUserTrue) {
      setLoginDetailsWrong(true);
    } else {
      let logindata = { username, password, id: loginUserTrue.id };
      dispatch(loginUser(logindata));
      navigate('/');
      setLoginDetailsWrong(false);
    }
  };

  return (
    <div className='auth_conatiner'>
      <div className='inputs_conatiner'>
        <h1>Login</h1>
        <TextField
          size='small'
          placeholder='username'
          name='username'
          value={username}
          onChange={handleUsername}
        />
        <TextField
          size='small'
          placeholder='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        <Button
          variant='contained'
          onClick={SubmitLogin}
        >
          Login
        </Button>
        {loginDetailsWrong && (
          <span style={{ color: 'red' }}>Please check username & password</span>
        )}

        <span style={{ marginTop: '20px' }}>
          Don't Have an account?
          <Link
            to='/auth/register'
            className='link'
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
