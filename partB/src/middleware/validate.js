function validateBook(req, res, next) {
  const { title, author } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'title is required and must be a string' });
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ success: false, error: 'author is required and must be a string' });
  }
  next();
}

function validateMember(req, res, next) {
  const { name, email } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, error: 'name is required and must be a string' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'valid email is required' });
  }
  next();
}

function validateLoan(req, res, next) {
  const { book_id, member_id } = req.body;
  if (!book_id || isNaN(book_id)) {
    return res.status(400).json({ success: false, error: 'valid book_id is required' });
  }
  if (!member_id || isNaN(member_id)) {
    return res.status(400).json({ success: false, error: 'valid member_id is required' });
  }
  next();
}

module.exports = { validateBook, validateMember, validateLoan };