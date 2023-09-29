import React, { useEffect } from 'react';
import './products.css';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/loading/Spinner';

import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useSelector } from 'react-redux';

const Products = () => {
  // const { data, loading, error } = useFetch('https://dummyjson.com/products');
  //redux
  const AllProducts = useSelector((state) => state.allProducts);
  const { allProducts, loading, error } = AllProducts;
  const data = allProducts;
  useFetch('/products');

  const [cart, setCart] = useState([]);
  const [rangeValue, setRangeValue] = useState(0);

  const handleAddToCart = (id) => {
    setCart([...cart, id]);
  };

  useEffect(() => {
    //cart
  }, [cart]);

  //inputs handling
  const handleRange = (e) => {
    console.log(e.target.value);
    setRangeValue(e.target.value);
  };

  return (
    <div>
      <div className='products_page'>
        <div className='products_left_conatiner'>
          <h2>Filter by</h2>

          <div className='filter_price'>
            <span> Rs: 10</span>
            <input
              type='range'
              min='10'
              max='2000'
              value={rangeValue}
              onChange={handleRange}
            />
            <span>Rs :2000</span>
          </div>
          <div className='filter_category'>
            <h4>Select by category</h4>
            <select className='select_categorqy'>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home& Appliances</option>
              <option>Mobiles</option>
            </select>
          </div>
          <div className='select_rating'>
            <h4>Filter by rating</h4>
            <div className='rating_box'>
              <input type='checkbox' />
              <span>
                4 <StarHalfIcon />
              </span>
            </div>
            <div className='rating_box'>
              <input type='checkbox' />
              <span>
                3 <StarHalfIcon />
              </span>
            </div>
            <div className='rating_box'>
              <input type='checkbox' />
              <span>
                2.5 <StarHalfIcon />
              </span>
            </div>
            <div className='rating_box'>
              <input type='checkbox' />
              <span>
                2 <StarHalfIcon />
              </span>
            </div>
          </div>
        </div>
        <div className='products_right_conatiner'>
          {loading ? (
            <Spinner />
          ) : (
            data &&
            data.map((item) => (
              <ProductsCard
                key={item.id}
                id={item.id}
                image={item.images[0]}
                desc={item.brand}
                price={item.price}
                title={item.title}
                brand={item.brand}
                handleAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
