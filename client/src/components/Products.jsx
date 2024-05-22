import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, formControlLabelClasses } from '@mui/material';
import axios from 'axios';

const Products = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [products, setProducts] = useState([])
    const userID = localStorage.getItem("userID")
    const [updated, setUpdated] = useState(false)


    const [editableProduct, setEditableProduct] = useState(null);

    const handleCellClick = (product, field) => {
        setEditableProduct({ ...product, editingField: field });
    };

    const handleFieldChange = (e, id, field) => {
        setEditableProduct({ ...editableProduct, [field]: e.target.value });
        console.log("ENTERED HERE")
        axios.put(`http://localhost:8000/api/products/${id}`, { [field]: e.target.value })
            .then(res => {
                console.log(res)
                setUpdated(!updated)

            })
            .catch(err => console.log(err))
    };




    useEffect(() => {
        axios.get('http://localhost:8000/api/category')
            .then(res => {
                console.log(res)
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                // console.log("te gjtha produktet: ",res.data)
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [updated])

    const handleSubmitProduct = (e) => {
        e.preventDefault();
        console.log("Clicked");
        const forma = {
            product_name: productName,
            product_price: productPrice,
            product_quantity: productQuantity,
            product_description: productDescription,
            category_id: selectedCategory,
            user: userID
        }
        console.log("FORMAAAA:   ", forma)

        axios.post('http://localhost:8000/api/products', forma)
            .then(res => {
                console.log(res.data)
                setUpdated(!updated)
                setProductName("")
                setProductDescription("")
                setProductPrice("")
                setProductQuantity("")
                setSelectedCategory("")
            })
            .catch(err => console.log(err))
    };


    const handleClickProduct = () => {
        console.log("BLERTAAA CLICKED THIS")
    }

    const handleClicking = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                // setProducts(products.filter(product => product._id !== id))
                setUpdated(!updated)
            })
            .catch(err => console.log(err))
    }




    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', color: '#333', fontWeight: 'bold' }}>All Products</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Options</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((product, index) => (
                                    <TableRow key={index} onClick={handleClickProduct}  style={{ backgroundColor: product.product_quantity === 0 ? 'rgba(255, 0, 0, 0.2)' : 'inherit' }}>
                                        <TableCell onClick={() => handleCellClick(product, 'product_name')}>
                                            {editableProduct && editableProduct._id === product._id && editableProduct.editingField === 'product_name' ? (
                                                <TextField
                                                    size="small"
                                                    value={editableProduct.product_name}
                                                    onChange={(e) => handleFieldChange(e, product._id, 'product_name')}
                                                    autoFocus
                                                />
                                            ) : (
                                                product.product_name
                                            )}
                                        </TableCell>
                                        <TableCell onClick={() => handleCellClick(product, 'product_price')}>
                                            {editableProduct && editableProduct._id === product._id && editableProduct.editingField === 'product_price' ? (
                                                <TextField
                                                    size="small"
                                                    value={editableProduct.product_price}
                                                    onChange={(e) => handleFieldChange(e, product._id, 'product_price')}
                                                    autoFocus
                                                />
                                            ) : (
                                                product.product_price
                                            )}
                                        </TableCell>
                                        <TableCell onClick={() => handleCellClick(product, 'product_quantity')}>
                                            {editableProduct && editableProduct._id === product._id && editableProduct.editingField === 'product_quantity' ? (
                                                <TextField
                                                    size="small"
                                                    value={editableProduct.product_quantity}
                                                    onChange={(e) => handleFieldChange(e, product._id, 'product_quantity')}
                                                    autoFocus
                                                />
                                            ) : (
                                                product.product_quantity
                                            )}
                                        </TableCell>
                                        <TableCell onClick={() => handleCellClick(product, 'product_description')}>
                                            {editableProduct && editableProduct._id === product._id && editableProduct.editingField === 'product_description' ? (
                                                <TextField
                                                    size="small"
                                                    multiline
                                                    rows={4}
                                                    value={editableProduct.product_description}
                                                    onChange={(e) => handleFieldChange(e, product._id, 'product_description')}
                                                    autoFocus
                                                />
                                            ) : (
                                                product.product_description
                                            )}
                                        </TableCell>
                                        <TableCell onClick={() => handleCellClick(product, 'category_id')}>
                                            {editableProduct && editableProduct._id === product._id && editableProduct.editingField === 'category_id' ? (
                                                <Select
                                                    size="small"
                                                    value={editableProduct.category_id}
                                                    onChange={(e) => handleFieldChange(e, product._id, 'category_id')}
                                                    autoFocus
                                                >
                                                    {categories.map(category => (
                                                        <MenuItem key={category._id} value={category._id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            ) : (
                                                product.category_id.name
                                            )}
                                        </TableCell>
                                        <TableCell><button className='small-button' onClick={(e) => handleClicking(product._id)}>Delete</button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', color: '#333', fontWeight: 'bold' }}>Products Form</Typography>
                    <form onSubmit={handleSubmitProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            size="small"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextField
                            label="Product Price"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <TextField
                            label="Product Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                        />
                        <TextField
                            label="Product Description"
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <Select
                            label="Category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            variant="outlined"
                            size="small"
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                Select a Category
                            </MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button type="submit" variant="contained" color="primary">Add Product</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Products;
