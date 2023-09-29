import React from 'react';
import './invoice.css';
import NumberToWordConverter from './NumberToWordConverter';

//invoice
//import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

//material imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function createData(
  item_name,
  qty,
  price,
  discount,
  gst,
  gst_amount,
  total_price
) {
  return { item_name, qty, price, discount, gst, gst_amount, total_price };
}

const rows = [
  createData('Redmi mobile', 1, 8500, 10, 18, 250, 8000),
  createData('Redmi mobile', 1, 1000, 5, 18, 250, 6000),
  createData('Redmi mobile', 1, 5000, 4, 18, 250, 7500),
  createData('Redmi mobile', 1, 5000, 4, 18, 250, 7500),
];

const InvoiceMaker = () => {
  //redux state
  const localstate = useSelector((state) => state);
  const { cart, auth } = localstate;
  const { products } = cart;
  console.log(localstate);

  const totalInvoiceAmount = () => {
    let tamount = 0;
    products.forEach(
      (item) =>
        (tamount =
          tamount + item.price * item.qty + (item.price * item.qty * 18) / 100)
    );
    return tamount.toFixed(2);
  };

  return (
    <div className='invoice'>
      <h1>Invoice</h1>
      <div className='date'>
        <span>INVOICE NO : GOSHOP1-101</span>
        <span>Date :2021/08/23</span>
      </div>
      <div className='from_and_to_address_conatiner'>
        <div className='from_address'>
          <h3>From </h3>
          <div className='item_text'>
            <span>Company Name</span>
            <span style={{ fontWeight: 600 }}> :GO SHOP</span>
          </div>
          <div className='item_text'>
            <span>Street</span>
            <span>:Bharati Nagar,</span>
          </div>
          <div className='item_text'>
            <span>City</span>
            <span>:Vijayawada,</span>
          </div>
          <div className='item_text'>
            <span>Pincode</span>
            <span>:521325</span>
          </div>
        </div>
        <div className='to_address'>
          <h3>Shipping To</h3>
          <div className='item_text'>
            <span>Customer Name</span>
            <span style={{ fontWeight: 500 }}>:Gopinadh vallabhanei</span>
          </div>
          <div className='item_text'>
            <span>Street</span>
            <span>:Bharati Nagar,</span>
          </div>
          <div className='item_text'>
            <span>City</span>
            <span>:Vijayawada,</span>
          </div>
          <div className='item_text'>
            <span>Pincode</span>
            <span>:521325</span>
          </div>
        </div>
      </div>
      <hr />
      <div className='items_description_conatiner'>
        <Table
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          <TableHead size='small'>
            <TableRow>
              <TableCell>item Name</TableCell>
              <TableCell align='right'>Qty</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Discount (%)</TableCell>
              <TableCell align='right'>Gst %</TableCell>
              <TableCell align='right'>Gst Amount</TableCell>
              <TableCell align='right'>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell scope='row'>{row.title}</TableCell>
                <TableCell align='right'>{row.qty}</TableCell>
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell align='right'>{row.discountPercentage}</TableCell>
                <TableCell align='right'>{18}</TableCell>
                <TableCell align='right'>{(row.price * 18) / 100}</TableCell>
                <TableCell align='right'>
                  {row.price * row.qty + (row.price * row.qty * 18) / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='total_amount_conatiner'>
          <span className='total_amount'>
            <p>Total Amount :</p>
            {products.length > 0 ? <p>{totalInvoiceAmount()}</p> : 0}
          </span>
        </div>
        <div className='word_converter'>
          <span> Amount in Words: </span>
          <NumberToWordConverter amount={totalInvoiceAmount()} />
        </div>
      </div>
      Note*: This is automatically generated invoice
    </div>
  );
};

export default InvoiceMaker;
