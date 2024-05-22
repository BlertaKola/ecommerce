const Category = require('../models/category.model');




module.exports.create = (req, res) => {
    
    Category.create(req.body)
    .then(resi => res.json(resi))
    .catch(err => res.json(err));

}

module.exports.delete = (request, response) => {
    Category.deleteOne({_id: request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports.getCategories = (req, res) => {
    Category.find()
        .then(allcateg => res.json(allcateg))
        .catch(err => res.json(err))
}