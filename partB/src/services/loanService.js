const { query, run } = require('../db');

function findAll() {
  return query(`
    SELECT l.*, b.title as book_title, m.name as member_name
    FROM loans l
    JOIN books b ON l.book_id = b.id
    JOIN members m ON l.member_id = m.id
  `);
}

function findById(id) {
  const rows = query('SELECT * FROM loans WHERE id = ?', [id]);
  return rows[0] || null;
}

function issueLoan(bookId, memberId) {
  const book = query('SELECT * FROM books WHERE id = ? AND available = 1', [bookId]);
  if (!book[0]) throw new Error('Book is not available');

  const member = query('SELECT * FROM members WHERE id = ?', [memberId]);
  if (!member[0]) throw new Error('Member not found');

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  run(
    'INSERT INTO loans (book_id, member_id, due_date) VALUES (?, ?, ?)',
    [bookId, memberId, dueDate.toISOString()]
  );

  run('UPDATE books SET available = 0 WHERE id = ?', [bookId]);

  const rows = query('SELECT * FROM loans ORDER BY id DESC LIMIT 1');
  return rows[0];
}

function returnLoan(loanId) {
  const loan = findById(loanId);
  if (!loan) throw new Error('Loan not found');
  if (loan.returned_at) throw new Error('Already returned');

  const now = new Date().toISOString();
  run('UPDATE loans SET returned_at = ? WHERE id = ?', [now, loanId]);
  run('UPDATE books SET available = 1 WHERE id = ?', [loan.book_id]);

  return findById(loanId);
}

function getOverdue() {
  const now = new Date().toISOString();
  return query(`
    SELECT l.*, b.title as book_title, m.name as member_name
    FROM loans l
    JOIN books b ON l.book_id = b.id
    JOIN members m ON l.member_id = m.id
    WHERE l.returned_at IS NULL AND l.due_date < ?
  `, [now]);
}

module.exports = { findAll, findById, issueLoan, returnLoan, getOverdue };