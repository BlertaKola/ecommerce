import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

const Categories = () => {
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const userID = localStorage.getItem("userID")
    useEffect(() => {
        axios.get('http://localhost:8000/api/category')
            .then(res => {
                console.log(res)
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("CICKED")
        axios.post('http://localhost:8000/api/category', {name: newCategory, user: userID})
            .then(res => {
                console.log(res)
                setNewCategory("")
            })
            .catch(err => console.log(err))
    };

    return (
        <Paper sx={{ padding: 2, height: '100%', maxWidth: 400, margin: 'auto', marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>Categories</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: 20 }}>
                <TextField
                    label="New Category"
                    variant="outlined"
                    size="small"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ marginRight: 10 }}
                />
                <Button type="submit" variant="contained" color="primary">Add</Button>
            </form>
            <div style={{ height: 'calc(100% - 128px)', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>Existing Categories:</Typography>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id} disablePadding>
                            <ListItemText>
                                <Link to={`/categories/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {category.name}
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Paper>
    );
};

export default Categories;
