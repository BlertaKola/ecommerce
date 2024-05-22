import { Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
const StyledPaper = styled(Paper)`
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 50px;
    margin-left: 10%;
    
`;

const Account = () => {

    const [userData, setUserData] = useState({
        
    });




    const userID = localStorage.getItem("userID")
    useEffect(()=>{
        if(userID){
            axios.get(`http://localhost:8000/api/users/${userID}`)
            .then(res => {
              console.log(res.data)
              const user = res.data[0]
              setUserData(user)
            })
            .catch(err => console.log(err));
        }
    },[userID])

    useEffect(() => {
        console.log("userDAta user after state update:", userData);
      }, [userData]);

      const handleSubmit = (e) =>{
        e.preventDefault()
      }

      

    return (
        <>
            <StyledPaper elevation={3}>
                <Typography variant="h5" gutterBottom align="center">Account Information</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                // label="First Name"
                                variant="outlined"
                                fullWidth
                                name="first_name"
                                value={userData.first_name}
                                onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                // label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="last_name"
                                value={userData.last_name}
                                onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                // label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                disabled
                                value={userData.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Role"
                                variant="outlined"
                                fullWidth
                                name="role"
                                disabled
                                value="Administrator"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
    
        </>
    );
    
};

export default Account;
