const express = require('express');
const router = express.Router();
const c = require('../controllers/bookController');

router.get('/', c.getBooks);
router.get('/:id', c.getBook);
router.post('/', c.createBook);
router.put('/:id', c.updateBook);
router.delete('/:id', c.deleteBook);

module.exports = router;