import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer_conatiner'>
      <div className='footer'>
        <div className='footer_left'>
          <h1>GO SHOP</h1>
        </div>
        <div className='footer_right'>
          <h2>Shop us</h2>
          <p>Electronics</p>
          <p>Fashion</p>
          <p>Home & Appliances</p>
          <p>Grocery</p>
        </div>
      </div>
      <div className='copyright'>
        <p>ALL RIGHTS RESERVED © GO SHOP 2023</p>
      </div>
    </div>
  );
};

export default Footer;
