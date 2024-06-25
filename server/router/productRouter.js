const router = require('express').Router()
const { getAllProducts } = require('../controllers/ProductController')

router.get('/', getAllProducts);

module.exports = router;