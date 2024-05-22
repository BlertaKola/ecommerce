import Footer from "../components/Footer"
import Nav from "../components/Nav"
import '../styles/prodpage.css'
const ProductPage = () => {
    return(
        <>
        <Nav/>  
        <div className="prod-container">
            <div className="box-1"></div>
            <div className="box-2"></div>
            <div className="box-3"></div>
        </div>

        <Footer/>
        </>
    )
}
export default ProductPage