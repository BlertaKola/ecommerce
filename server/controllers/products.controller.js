const Product = require('../models/products.model');


module.exports.create = (req, res) => {
    Product.create(req.body)
        .then(resi => res.json(resi))
        .catch(err => res.status(400).json(err))
}


module.exports.getProducts = (req, res) => {
    Product.find()
        .populate("category_id")
        .then(allprod => res.json(allprod))
        .catch(err => res.json(err))
}

module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({_id: request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}


module.exports.editProduct = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(response => res.json(response))
        .catch(err => res.json(err))
}