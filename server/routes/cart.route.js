const CartController = require('../controllers/cart.controller')


module.exports = (app) => {
    app.post('/api/cart', CartController.createCart);
    app.get('/api/cart/:id', CartController.getCart);
    app.put('/api/cart/:id/add', CartController.addToCart);
    app.delete('/api/cart/:id/delete', CartController.removeFromCart);
    app.delete('/api/cart/:id/clear', CartController.clearCart);
}