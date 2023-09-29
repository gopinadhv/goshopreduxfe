import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Products from './pages/Products/Products';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SingleProduct from './pages/SingleProduct.js/singleproduct';

import { Routes, Route } from 'react-router';
import Cart from './pages/cart/Cart';
import UserProfile from './pages/profile/UserProfile';
import { useEffect } from 'react';
import { Token } from '@mui/icons-material';

function App() {
  useEffect(() => {
    setTimeout(() => {
      let usertoken = localStorage.getItem('token');
      console.log(usertoken);
      let rev = atob(usertoken);
      let splitusername = rev.substring(6);
      console.log(splitusername);
    }, 1000);
  });

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Products />}
        />
        <Route path='/auth'>
          <Route
            index
            element={<Login />}
          />
          <Route
            path='/auth/register'
            element={<Register />}
          />
          <Route
            path='/auth/profile'
            element={<UserProfile />}
          />
        </Route>
        <Route path='/products'>
          <Route
            index
            element={<Products />}
          />
          <Route
            path='/products/:id'
            element={<SingleProduct />}
          />
        </Route>
        <Route
          path='/cart'
          element={<Cart />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
