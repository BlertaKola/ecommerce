
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/useraccount.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
const UserAccount = () => {

   
    
    const [userData, setUserData] = useState({
        
    });




    const userID = localStorage.getItem("userID")

    useEffect(()=>{
        if(userID){
            axios.get(`http://localhost:8000/api/users/${userID}`)
            .then(res => {
              const user = res.data[0]
              setUserData(user)
            })
            .catch(err => console.log(err));
        }
    },[userID])

    // useEffect(() => {
    //     console.log("userDAta user after state update:", userData);
    //   }, [userData]);



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("HELP ME")
        axios.patch(`http://localhost:8000/api/users/${userID}`, userData, {withCredentials: true})
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    
    

    
    return(
        <>
        <Nav />
        {userID ? <div className='form-place'>
                <div className='documents'>
                    <h3>Orders</h3>

                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Edit your account info</h3>
                    <div>
                        <label htmlFor="first_name">Your First Name</label>
                        <input type="text" placeholder='e.g. John' value={userData.first_name} onChange={(e) => setUserData({...userData, first_name:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="last_name">Your Last Name</label>
                        <input type="text" placeholder='e.g. Doe' value={userData.last_name} onChange={(e) => setUserData({...userData, last_name:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" value={userData.address} onChange={(e) => setUserData({...userData, address:e.target.value})}/>
                    </div>
                    
                    <button type="submit">Update</button>
                  
                </form>
            </div> : <div className='form-place'>
                <h1>You must be logged in</h1>
                </div>}
            
        <Footer />
        </>
    )
}
export default UserAccount