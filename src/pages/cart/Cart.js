import React, { useState } from 'react';
import emptycart from '../../assests/images/emptycart.avif';
import './cart.css';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cartReducer';
import { Button } from '@mui/material';

//invoice
//import { PDFViewer } from '@react-pdf/renderer';

//material imports
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InvoiceMaker from '../../components/invoice/InvoiceMaker';

const Cart = () => {
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  console.log(process.env.REACT_APP_PRODUCTS_API_URL);

  //state
  const [qty, setQty] = useState(1);

  //handling
  // const handleIncrement = (id) => {
  //   setQty(qty + 1);
  // };

  // const handleDecrement = (id) => {
  //   setQty(qty - 1);
  // };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalCartAmount = () => {
    let TotalAmount = 0;
    products.forEach(
      (item) => (TotalAmount = TotalAmount + item.qty * item.price)
    );
    return TotalAmount.toFixed(2);
    console.log(TotalAmount);
  };
  totalCartAmount();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='cart'>
      <div className='cart_container'>
        <div className='products_conatiner_cart'>
          {products.length > 0 ? (
            products.map((data) => (
              <div
                className='product_card'
                key={data.id}
              >
                <div className='image_container'>
                  <img
                    className='image_product'
                    src={data && data.image}
                    alt=''
                  />
                </div>
                <div className='cart_counter_details'>
                  <h3>{data.title}</h3>
                  <p>
                    Qty:{data.qty} x Rs :{data.price}
                  </p>
                  <div className='counter_conatiner'>
                    <h4>Amount: {data.qty * data.price}</h4>
                    {/* <div className='counter'>
                      <button onClick={() => handleIncrement(data.id)}>
                        +
                      </button>
                      <span className='count'>{qty}</span>
                      <button onClick={() => handleDecrement(data.id)}>
                        -
                      </button>
            </div>*/}
                    <div
                      className='delete_conatiner'
                      onClick={() => handleRemoveFromCart(data.id)}
                    >
                      <Tooltip title='Delete'>
                        <IconButton color='warning'>
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <img
                className='emptycartimage'
                src={emptycart}
                alt=''
              />
              <p>No Items In Cart</p>
            </div>
          )}
          <hr />
          {products.length > 0 ? (
            <div className='place_order_container'>
              <span>Total Amount: Rs {totalCartAmount()} /-</span>

              <Button
                size='small'
                variant='outlined'
                onClick={handlePrint}
              >
                Place Order
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='invoice_conatiner'>
          <InvoiceMaker />
        </div>
      </div>
    </div>
  );
};

export default Cart;
