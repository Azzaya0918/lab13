const bookService = require('../services/bookService');

async function getBooks(req, res, next) {
  try {
    const books = bookService.findAll(req.query);
    res.json({ success: true, data: books });
  } catch (err) { next(err); }
}

async function getBook(req, res, next) {
  try {
    const book = bookService.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, error: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) { next(err); }
}

async function createBook(req, res, next) {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ success: false, error: 'title and author are required' });
    }
    const book = bookService.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) { next(err); }
}

async function updateBook(req, res, next) {
  try {
    const book = bookService.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, error: 'Book not found' });
    const updated = bookService.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

async function deleteBook(req, res, next) {
  try {
    const book = bookService.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, error: 'Book not found' });
    bookService.remove(req.params.id);
    res.json({ success: true, message: 'Book deleted' });
  } catch (err) { next(err); }
}

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };