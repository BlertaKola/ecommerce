import { useState } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import '../styles/register.css'
import axios from 'axios'

const Login = ({setLoggedUser}) => {
    const [loginUser, setLoginUser] = useState({email: "", password: ""})
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', loginUser, { withCredentials: true })
        .then(res => {console.log(res)
            const user = res.data.user
            console.log(user.isAdmin)
            setLoggedUser({id:user._id,email:user.email});
            localStorage.setItem('userID', user._id);
            if(user.isAdmin){
                window.location.href = '/admin'
            }
            window.location.href = '/';
        })
        .catch(err => console.log(err));
    }
    return(
        <>
        <Nav />
            <div className='form-place'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" value={loginUser.email} onChange={(e) => setLoginUser({...loginUser, email:e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={loginUser.password} onChange={(e) => setLoginUser({...loginUser, password: e.target.value})} />
                    </div>
                    <button type="submit">Sign up</button>
                    <a href="/register">Don't have an account?</a>
                </form>
            </div>
            <Footer />
        </>
    )
}
export default Login