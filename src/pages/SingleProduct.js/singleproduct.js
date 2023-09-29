import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import './singleproduct.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

//router
import { useNavigate } from 'react-router-dom';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

//material imports
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Button } from '@mui/material';
import { products } from '../../components/ProductsCard/productsdata';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SingleProduct = () => {
  //router
  let { id } = useParams();

  //redux
  const auth = useSelector((state) => state.auth);
  // const auth = {
  //   isLoggedIn: true,
  //   loginDetails: { username: 'gopinadh', password: '' },
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state
  const [productdata, setProductData] = useState('');
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState();

  useEffect(() => {
    let carddata = products.find((item) => item.id == id);
    setProductData(carddata);
  }, [id]);

  //handle quantity

  const handleIncrement = (id) => {
    setQty((prev) => prev + 1);
  };

  const handleDecrement = (id) => {
    setQty((prev) => prev - 1);
  };

  const handleAddToCart = ({
    id,
    title,
    brand,
    image,
    price,
    qty,
    discountPercentage,
  }) => {
    if (auth.isLoggedIn === true) {
      dispatch(
        addToCart({ id, title, brand, image, price, qty, discountPercentage })
      );
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className='singleproduct_page'>
      <div className='singleproduct_conatiner'>
        <div className='singleproduct_left_conatiner'>
          <div className='small_image_container'>
            <div
              className='small_img_card'
              onClick={() => setMainImage(productdata && productdata.images[0])}
            >
              <img
                className='smallimage'
                src={productdata && productdata.images[0]}
                alt=''
              />
            </div>
            <div
              className='small_img_card'
              onClick={() => setMainImage(productdata && productdata.images[1])}
            >
              <img
                className='smallimage'
                src={productdata && productdata.images[1]}
                alt=''
              />
            </div>
            <div
              className='small_img_card'
              onClick={() => setMainImage(productdata && productdata.images[2])}
            >
              <img
                className='smallimage'
                src={productdata && productdata.images[2]}
                alt=''
              />
            </div>
          </div>
          <div className='main_image_conatiner'>
            <img
              className='smallimage'
              src={mainImage ? mainImage : productdata && productdata.images[0]}
              alt=''
            />
          </div>
        </div>
        <div className='singleproduct_right_conatiner'>
          <div className='details_section'>
            <span>{productdata && productdata.brand}</span>
            <h2>{productdata && productdata.title}</h2>
            <h5>{productdata && productdata.description}</h5>
          </div>
          <div className='price_section'>
            <h1> Rs :{productdata && productdata.price}/-</h1>
            <h3>
              {' '}
              Discount : {productdata && productdata.discountPercentage} %
            </h3>
            <p>Stock Left :{productdata && productdata.stock}</p>
          </div>
          <div className='rating_section'>
            <p>
              Avg Rating : <StarHalfIcon />
              {productdata && productdata.rating}
            </p>
            <p>Total rating :201</p>
          </div>
          <div className='counter'>
            <button onClick={() => handleIncrement(id)}>+</button>
            <span className='count'>{qty}</span>
            <button onClick={() => handleDecrement(id)}>-</button>
          </div>

          <div className='buy_options_section'>
            <Button
              size='large'
              variant='contained'
              color='secondary'
              onClick={() =>
                handleAddToCart({
                  id,
                  brand: productdata.brand,
                  discountPercentage: productdata.discountPercentage,
                  title: productdata.title,
                  image: productdata.images[0],
                  price: productdata.price,
                  qty,
                })
              }
            >
              Add To <ShoppingCartIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
