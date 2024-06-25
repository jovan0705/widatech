const router = require('express').Router()
const { getAllInvoice, createInvoice } = require('../controllers/InvoiceController')

router.post('/post', createInvoice);
router.get('/', getAllInvoice);

module.exports = router;