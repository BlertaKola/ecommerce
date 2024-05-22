const CategoryController = require('../controllers/category.controller')
// const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.post('/api/category', CategoryController.create);  
    app.get('/api/category', CategoryController.getCategories);
    app.delete('/api/category/:id', CategoryController.delete);
} 