const WishlistController = require('../controllers/wishlists.controller')

module.exports = (app) => {
    app.get('/api/wishlist/:id', WishlistController.getWishlist);
    app.post('/api/wishlist', WishlistController.createWishlist);

    // ben add product ne wishlist me id e userit
    app.put('/api/wishlist/:id/add', WishlistController.addToWishlist);
    app.delete('/api/wishlist/:id/delete', WishlistController.removeFromWishlist)
} 