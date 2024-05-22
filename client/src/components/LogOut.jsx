import '../styles/nav.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
        .then(res => {
            localStorage.removeItem('userID');
            window.location.reload();
            
            navigate('/');
        })
        .catch(err => console.log(err));
       
        
    }

    return(
        <>
        
        <button className="navbar-button small-button" onClick={logout}>Log Out</button>
        </>
    )
}
export default LogOut