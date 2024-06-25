const router = require('express').Router()
const { errorHandler } = require('../middlewares/errorHandler');
const invoiceRouter = require('./invoiceRouter');
const productRouter = require('./productRouter')

router.use('/invoice', invoiceRouter);
router.use('/product', productRouter);

router.use(errorHandler);

module.exports = router