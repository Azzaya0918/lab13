const { query, run } = require('../db');

function findAll(filters = {}) {
  const { title, author, genre } = filters;
  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];

  if (title) { sql += ' AND title LIKE ?'; params.push(`%${title}%`); }
  if (author) { sql += ' AND author LIKE ?'; params.push(`%${author}%`); }
  if (genre) { sql += ' AND genre LIKE ?'; params.push(`%${genre}%`); }

  return query(sql, params);
}

function findById(id) {
  const rows = query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0] || null;
}

function create(data) {
  const { title, author, genre = null, isbn = null } = data;
  run(
    'INSERT INTO books (title, author, genre, isbn) VALUES (?, ?, ?, ?)',
    [title, author, genre, isbn]
  );
  const rows = query('SELECT * FROM books ORDER BY id DESC LIMIT 1');
  return rows[0];
}

function update(id, data) {
  const { title, author, genre = null, isbn = null } = data;
  run(
    'UPDATE books SET title = ?, author = ?, genre = ?, isbn = ? WHERE id = ?',
    [title, author, genre, isbn, id]
  );
  return findById(id);
}

function remove(id) {
  run('DELETE FROM books WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, update, remove };