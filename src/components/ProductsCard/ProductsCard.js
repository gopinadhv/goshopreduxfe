import React, { useEffect, useState } from 'react';
import './productcard.css';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

const ProductsCard = (props) => {
  const { id, title, price, image, brand } = props;

  //redux state
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handling
  const handleAddToCart = () => {
    console.log('added');
  };

  return (
    <div
      className='productcard_container'
      key={id}
    >
      <Link to={`/products/${id}`}>
        <div className='image_conatiner'>
          <img
            className='imageproduct'
            src={image}
            alt={id}
          />
        </div>
      </Link>
      <div className='content_conatiner'>
        <p>{brand}</p>
        <h3>{title}</h3>
        <h4>Rs : {price}</h4>
        <Button
          variant='contained'
          size='small'
          color='info'
          onClick={() => handleAddToCart(id)}
        >
          View Item
        </Button>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
};
export default ProductsCard;
