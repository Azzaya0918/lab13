const express = require('express');
const router = express.Router();
const c = require('../controllers/loanController');

router.get('/', c.getLoans);
router.get('/overdue', c.getOverdue);
router.post('/', c.createLoan);
router.put('/:id/return', c.returnLoan);

module.exports = router;