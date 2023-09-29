import React, { useEffect, useState } from 'react';
import './navbar.css';

//ROUTER IMPORTS
import { NavLink, Link, useNavigate } from 'react-router-dom';

//REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authReducer';

//MATERIAL UI IMPORTS
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const auth = useSelector((state) => state.auth);

  const [userToken, setUserToken] = useState('');
  // const auth = {
  //   isLoggedIn: true,
  //   loginDetails: { username: 'gopinadh', password: '' },
  // };

  //router
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    setUserToken(token);
  });

  return (
    <div className='navbar'>
      <Link
        to='/'
        className='link'
      >
        <div className='logo_conatiner'>GO SHOP</div>
      </Link>
      <div className='options_conatiner'>
        <NavLink
          className='link'
          to='/products'
        >
          <span className='option'>ELECTRONICS</span>
        </NavLink>
        <NavLink
          className='link'
          to='/products'
        >
          <span className='option'>FASHION</span>
        </NavLink>
        <NavLink
          className='link'
          to='/products'
        >
          <span className='option'>HOME & APPLIANCES</span>
        </NavLink>
      </div>
      <div className='user_options_conatiner'>
        <Link
          className='link'
          to='/cart'
        >
          <span className='option'>
            <Badge
              badgeContent={products.length}
              color='primary'
            >
              <ShoppingCartIcon />
            </Badge>
          </span>
        </Link>

        {auth.isLoggedIn && userToken !== '' ? (
          <Link
            to='/auth/profile'
            className='link'
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <AccountCircleIcon />
              <span>{auth.isLoggedIn ? auth.loginDetails.username : ''}</span>
            </span>
          </Link>
        ) : (
          <Link
            to='/auth'
            className='link'
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <AccountCircleIcon />
              <span>{auth.isLoggedIn ? auth.loginDetails.username : ''}</span>
            </span>
          </Link>
        )}

        {auth.isLoggedIn ? (
          <Button
            variant='contained'
            size='small'
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant='contained'
            size='small'
          >
            <Link
              className='link'
              to='/auth'
            >
              Log In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
