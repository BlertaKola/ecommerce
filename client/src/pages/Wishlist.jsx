import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import '../styles/wishlist.css'
import axios from "axios"
import Product from '../components/Product'


const Wishlist = () => {


    const userID = localStorage.getItem("userID")
    const [products, setProducts] = useState([])
    const [updated, setUpdated] = useState(false)
    
    useEffect(()=>{
        if(userID){
            axios.get(`http://localhost:8000/api/wishlist/${userID}`)
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
        <div className="wishlist-container">
        {products.length !== 0 ? 
        <div className="product-grid">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
        : <div className="empty-wishlist-message">
            Your wishlist is empty!
            </div>}
         </div>
        <Footer/>
        </>
    )
}
export default Wishlist