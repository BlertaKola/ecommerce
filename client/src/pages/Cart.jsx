import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import '../styles/cart.css'
import axios from "axios"
import Product from '../components/Product'
import { useEffect, useState } from "react"


const Cart = (props) => {
    const userID = localStorage.getItem("userID")
    const [products, setProducts] = useState([])
    const [updated, setUpdated] = useState(false)
    
    useEffect(()=>{
        if(userID){
            axios.get(`http://localhost:8000/api/cart/${userID}`)
                .then(res => {
                    console.log(res.data[0].products)
                    setProducts(res.data[0].products)
                    setUpdated(!updated)
                })
                .catch(err => console.log(err))
        }
    },[userID, updated])
    return(
        <>
        <Nav/>
        <div className="cart-container">
        {products.length !== 0 ? 
        <div className="product-grid">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
        : <div className="empty-wishlist-message">
            Your Cart is empty!
            </div>}
        </div>
        <Footer/>
        </>
    )
}

export default Cart