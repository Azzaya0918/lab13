const { query, run } = require('../db');

function findAll() {
  return query('SELECT * FROM members');
}

function findById(id) {
  const rows = query('SELECT * FROM members WHERE id = ?', [id]);
  return rows[0] || null;
}

function create(data) {
  const { name, email, phone = null } = data;
  run(
    'INSERT INTO members (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  const rows = query('SELECT * FROM members ORDER BY id DESC LIMIT 1');
  return rows[0];
}

function update(id, data) {
  const { name, email, phone = null } = data;
  run(
    'UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id]
  );
  return findById(id);
}

function remove(id) {
  run('DELETE FROM members WHERE id = ?', [id]);
}

module.exports = { findAll, findById, create, update, remove };