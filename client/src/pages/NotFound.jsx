import { useNavigate } from 'react-router-dom'
import '../styles/notfound.css'

const NotFound = () =>{
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return(
        <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleClick}>Go to home</button>
    </div>
    )
}
export default NotFound