import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import Overview from './components/Overview';
import Customers from './components/Customers';
import Products from './components/Products';
import Orders from './components/Orders';
import Account from './components/Account';
import Categories from './components/Categories';
import Landing from './pages/Landing';
import ProductPage from './pages/ProductPage';
import UserAccount from './pages/UserAccount';
import NotFound from './pages/NotFound';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import axios from 'axios';

function App() {
  const userID = localStorage.getItem("userID");
  const [loggedUser, setLoggedUser] = useState({ id: "", email: "", isAdmin: false });

  useEffect(() => {
  if (userID) {
    axios.get(`http://localhost:8000/api/users/${userID}`)
      .then(res => {
        const user = res.data[0]; 
        // console.log("User from API:", user);
        setLoggedUser({
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin 
        });
        // console.log("USERI PAS API: ", loggedUser)
      })
      .catch(err => console.log(err));
  }
}, [userID]);
useEffect(() => {
  console.log("Logged user after state update:", loggedUser);
}, [loggedUser]);
  
  


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Landing />} />
        <Route path='/products' element={<Home />} />
        <Route path='/products/:id' element={<ProductPage />} />

        {loggedUser.isAdmin && (
          <Route path='/admin' element={<AdminPage />}>
            <Route path='' element={<Navigate to="overview" />} />
            <Route path='overview' element={<Overview />} />
            <Route path='customers' element={<Customers />} />
            <Route path='products' element={<Products />} />
            <Route path='categories' element={<Categories />} />
            <Route path='orders' element={<Orders />} />
            <Route path='account' element={<Account />} />
          </Route>
        )}

        <Route path='/account/:id' element={<UserAccount />} />
        <Route path='/wishlist/:id' element={<Wishlist />} />
        <Route path='/cart/:id' element={<Cart />} />

        <Route path='/login' element={<Login setLoggedUser={setLoggedUser} />} />
        <Route path='/register' element={<Register setLoggedUser={setLoggedUser} />} />

         <Route path='*' element={<NotFound />} /> 





      </Routes>


      
    </BrowserRouter>
  );
}

export default App;
