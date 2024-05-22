import { useEffect } from 'react';
import '../styles/nav.css'
import LogOut from './LogOut';
import axios from 'axios';
import { useState } from 'react';
const Nav = () => {
    const userID = localStorage.getItem('userID');
    const [Admin, setAdmin] = useState(false);
    useEffect(()=>{
        if(userID){
            axios.get(`http://localhost:8000/api/users/${userID}`)
                .then(res => {
                    const user = res.data[0]
                    setAdmin(user.isAdmin);
                    // console.log("ADMINIIII ", Admin)
                })
                .catch(err => console.log(err))
        }
    }, [userID])
    useEffect(()=>{
        console.log("ADMINNNN after state update:", Admin);
    },[Admin])
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-brand">E-shop</a>
                <a href="/products">Shop</a>
                <a href={`/wishlist/${userID}`}>Wishlist</a>
                <a href={`/cart/${userID}`}>Cart</a>

                {Admin ? (
                    <a href='/admin'>Go to Dashboard</a>
                ) : <a href={`/account/${userID}`}>Account</a>}
                {userID ? (
                    <LogOut/>
                ) : (
                    <a href="/login" className="navbar-button">Login</a>
                )}
                
            </div>
        </nav>
    );
};

export default Nav;
