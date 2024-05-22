import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Product from '../components/Product';
import TrendingNow from '../components/TrendingNow';
import '../styles/home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const userID = localStorage.getItem("userID");

    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                console.log("All products: ", res.data);
                setAllProducts(res.data);
                setProducts(res.data);  // Initially, display all products
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/category')
            .then(res => {
                console.log(res);
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleCategoryClick = (id) => {
        console.log(id);
        setSelectedCategory(id);
        if (id === "") {
            setProducts(allProducts); // Reset to all products if no category is selected
        } else {
            const filteredProducts = allProducts.filter(product => product.category_id._id === id);
            console.log(filteredProducts);
            setProducts(filteredProducts);
        }
    };

    return (
        <div className='whole'>
            <Nav />
        
            <TrendingNow />
            <div className="container">
                <div className="box1">
                    <div className="grid-container">
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                </div>
                <div className="box2">
                    <h2>Filter by Categories</h2>
                    <ul>
                        <li onClick={() => handleCategoryClick("")}>All</li>
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category._id)}>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
