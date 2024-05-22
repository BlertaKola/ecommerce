import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Product from '../components/Product'
import Slider from '../components/Slider'
import TrendingNow from '../components/TrendingNow'
import '../styles/landing.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Landing = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                // console.log("te gjtha produktet: ",res.data)
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    },[])
    return (
        <div className="container-landing">
            <Nav/>
            <Slider />
            <TrendingNow />
            <div className='div-random-prod'>
                <h1>Our Latest Products</h1>
                
            </div>
            <div className="product-grid">
            {products.slice(0,4).map((product, indx) => {
                    return (
                        <Product key={indx} product={product} />  // Passing product data as props
                    );
                })}
                    
                </div>  
            <Footer />
        </div>
    )
}

export default Landing