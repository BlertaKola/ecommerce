import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import '../styles/cart.css'
const Cart = (props) => {
    const {id} = useParams()
    return(
        <>
        <Nav/>
        <div className="cart-container">
        carta e mallkuar {id}
        </div>
        <Footer/>
        </>
    )
}

export default Cart