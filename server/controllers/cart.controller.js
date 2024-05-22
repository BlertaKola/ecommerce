const Cart = require('../models/cart.model')

module.exports.createCart = (req, res) =>{
    const newCart = new Cart({
        user_id: req.body.user_id,
        products: req.body.products
    });

    newCart.save()
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json(err));
}

module.exports.getCart = (req, res) => {
    Cart.find({user_id: req.params.id})
        .populate("products")
        .then(rezi => res.json(rezi))
        .catch(err => res.json(err))
}


module.exports.addToCart = (req, res) =>{
    Cart.findOne({ user_id: req.params.id })
    .then(cart => {
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        
        cart.products.push(req.body.product_id);
        cart.save()
            .then(updatedCart => res.json(updatedCart))
            .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
}


module.exports.removeFromCart = (req, res) => {
    Cart.findOne({ user_id: req.params.id })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            
            cart.products.pull(req.body.product_id);
            cart.save()
                .then(updatedCart => res.json(updatedCart))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};

module.exports.clearCart = (req, res) => {
    Cart.findOne({ user_id: req.params.id })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            
            cart.products = []; // Clearing the products array
            cart.save()
                .then(updatedCart => res.json(updatedCart))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};