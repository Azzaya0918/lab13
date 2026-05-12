const loanService = require('../services/loanService');

async function getLoans(req, res, next) {
  try {
    const loans = loanService.findAll();
    res.json({ success: true, data: loans });
  } catch (err) { next(err); }
}

async function createLoan(req, res, next) {
  try {
    const { book_id, member_id } = req.body;
    if (!book_id || !member_id) {
      return res.status(400).json({ success: false, error: 'book_id and member_id are required' });
    }
    const loan = loanService.issueLoan(book_id, member_id);
    res.status(201).json({ success: true, data: loan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function returnLoan(req, res, next) {
  try {
    const loan = loanService.returnLoan(req.params.id);
    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getOverdue(req, res, next) {
  try {
    const loans = loanService.getOverdue();
    res.json({ success: true, data: loans });
  } catch (err) { next(err); }
}

module.exports = { getLoans, createLoan, returnLoan, getOverdue };