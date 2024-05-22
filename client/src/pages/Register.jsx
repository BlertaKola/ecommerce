import { useState } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import '../styles/register.css'
import axios from 'axios'

const Register = ({setLoggedUser}) => {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("CLICKED")
        axios.post('http://localhost:8000/api/register', form, {withCredentials: true})
            .then(res => {
                console.log(res)
                setLoggedUser({id:res.data.user._id, email:res.data.user.email})
                localStorage.setItem('userID', res.data.user._id)
                
                window.location.href = '/'
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Nav />
            <div className='form-place'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="first_name">Your First Name</label>
                        <input type="text" placeholder='e.g. John' value={form.first_name} onChange={(e) => setForm({...form, first_name: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="last_name">Your Last Name</label>
                        <input type="text" placeholder='e.g. Doe' value={form.last_name} onChange={(e) => setForm({...form, last_name: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} />
                    </div>
                    <button type="submit">Sign up</button>
                    <a href="/login">Already have an account?</a>
                </form>
            </div>
            <Footer />
        </>
    )
}
export default Register