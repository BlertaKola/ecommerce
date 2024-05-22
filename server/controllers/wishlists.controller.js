const Wishlist = require('../models/wishlist.model')


module.exports.getWishlist = (req, res) =>{
    Wishlist.find({user_id: req.params.id})
        .populate("products")
        .then(wish => res.json(wish))
        .catch(err => res.json(err))
}


module.exports.createWishlist = (req, res) => {
    const newWishlist = new Wishlist({
        user_id: req.body.user_id,
        products: req.body.products
    });

    newWishlist.save()
        .then(wishlist => res.json(wishlist))
        .catch(err => res.status(400).json(err));
};

module.exports.addToWishlist = (req, res) => {
    Wishlist.findOne({ user_id: req.params.id })
        .then(wishlist => {
            if (!wishlist) {
                return res.status(404).json({ error: "Wishlist not found" });
            }
            
            wishlist.products.push(req.body.product_id);
            wishlist.save()
                .then(updatedWishlist => res.json(updatedWishlist))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};



module.exports.removeFromWishlist = (req, res) => {
    Wishlist.findOne({ user_id: req.params.id })
        .then(wishlist => {
            if (!wishlist) {
                return res.status(404).json({ error: "Wishlist not found" });
            }
            
            wishlist.products.pull(req.body.product_id);
            wishlist.save()
                .then(updatedWishlist => res.json(updatedWishlist))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};