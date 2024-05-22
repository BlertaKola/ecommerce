const ProductController = require('../controllers/products.controller')
// const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.post('/api/products', ProductController.create);  
    app.get('/api/products', ProductController.getProducts);
    app.delete('/api/products/:id', ProductController.deleteProduct);
    app.put('/api/products/:id', ProductController.editProduct)
} 