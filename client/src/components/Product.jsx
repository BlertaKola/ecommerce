import '../styles/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import productImage from '../images/download.png';
import { useEffect, useState } from 'react';
import axios from 'axios'


const Product = ({ product }) => {

    const userID = localStorage.getItem("userID")
    const [hasWishlist, setHasWishlist] = useState(false)
    const [wishProducts, setWishProducts] = useState([])

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


    useEffect(() => {
        fetchWishlist();
    }, [userID, updated]);


    const handleWishlist = (id) => {
        if (hasWishlist) {
            // if()  i want to check here if the id is in wishlists array
            if (wishProducts.find(item => item._id === id)) {
                console.log(`Product with id ${id} is already in the wishlist.`);
                axios.delete(`http://localhost:8000/api/wishlist/${userID}/delete`, { data: { user_id: userID, product_id: id } })
                    .then(res => {
                        console.log(res)
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err))
            } else {
                axios.put(`http://localhost:8000/api/wishlist/${userID}/add`, { user_id: userID, product_id: [id] })
                    .then(res => {
                        console.log(res.data);
                        setUpdated(!updated)
                    })
                    .catch(err => console.log(err));
            }
        }
        else {
            axios.post(`http://localhost:8000/api/wishlist`, { user_id: userID, product_id: [id] })
                .then(res => {
                    console.log(res)
                    setUpdated(!updated)
                })
                .catch(err => console.log(err))
        }
        console.log("ARE YOU GETTING THIS")

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
                            <button className="button-cart">
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
