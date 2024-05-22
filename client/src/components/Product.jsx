import '../styles/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import productImage from '../images/download.png';
import { useEffect, useState } from 'react';
import axios from 'axios'


const Product = ({ product }) => {

    const userID = localStorage.getItem("userID")
    const [hasWishlist, setHasWishlist] = useState(false)
    const [hasCart, setHasCart] = useState(false)

    const [wishProducts, setWishProducts] = useState([])
    const [cartProducts, setCartProducts] =useState([])

    const [updated, setUpdated] = useState(false)

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/wishlist/${userID}`);

            if (response.data.length == 0) {

                setHasWishlist(false)
            }
            setHasWishlist(true)
            setWishProducts(response.data[0].products)
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };
    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cart/${userID}`);
            if (response.data.length == 0) {

                setHasCart(false)
            }
            setHasCart(true)
            setCartProducts(response.data[0].products)
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };


    useEffect(() => {
        fetchWishlist();
        fetchCart()
    }, [userID, updated]);


    const handleWishlist = (id) => {
        if (hasWishlist) {
            if (wishProducts.find(item => item._id === id)) {
                axios.delete(`http://localhost:8000/api/wishlist/${userID}/delete`, { data: { user_id: userID, product_id: id } })
                    .then(res => {
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err))
            } else {
                axios.put(`http://localhost:8000/api/wishlist/${userID}/add`, { user_id: userID, product_id: [id] })
                    .then(res => {
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err));
            }
        }
        else {
            axios.post(`http://localhost:8000/api/wishlist`, { user_id: userID, product_id: [id] })
                .then(res => {
                    setUpdated(!updated)
                })
                .catch(err => console.log(err))
        }
        console.log("ARE YOU GETTING THIS")

    }
    const handleCart = (id) => {
        if (hasCart) {
            if (cartProducts.find(item => item._id === id)) {
                axios.delete(`http://localhost:8000/api/cart/${userID}/delete`, { data: { user_id: userID, product_id: id } })
                    .then(res => {
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err))
            } else {
                axios.put(`http://localhost:8000/api/cart/${userID}/add`, { user_id: userID, product_id: [id] })
                    .then(res => {
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err));
            }
        }
        else {
            axios.post(`http://localhost:8000/api/cart`, { user_id: userID, products: [id] })
                .then(res => {
                    setUpdated(!updated)
                })
                .catch(err => console.log(err))
        }

    }


    return (
        <div className="card" >
            <div className="card-image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="category">{product.product_name}</div>
            <div className="heading">
                {product.product_description.slice(0, 10)}{product.product_description.length > 10 ? '...' : ''}
                <div className="author">
                    <span className="name">{product.product_price}L</span>
                    <div className="buttons">
                        {userID ? <>
                            <button className={`button-heart ${wishProducts.find(item => item._id === product._id) ? 'in-wishlist' : ''}`} onClick={() => handleWishlist(product._id)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button className={`cart-button ${cartProducts.find(item => item._id === product._id) ? 'in-cart' : ''}`} onClick={() => handleCart(product._id)}>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                        </> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
