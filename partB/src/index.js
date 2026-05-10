const express = require('express');
const path = require('path');
const { getDb, query } = require('./db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));
app.use('/api/loans', require('./routes/loans'));

app.get('/api/stats', async (req, res) => {
  try {
    const totalBooks = query('SELECT COUNT(*) as count FROM books')[0].count;
    const availableBooks = query('SELECT COUNT(*) as count FROM books WHERE available = 1')[0].count;
    const activeLoans = query('SELECT COUNT(*) as count FROM loans WHERE returned_at IS NULL')[0].count;
    const overdueLoans = query(`SELECT COUNT(*) as count FROM loans WHERE returned_at IS NULL AND due_date < ?`, [new Date().toISOString()])[0].count;
    const totalMembers = query('SELECT COUNT(*) as count FROM members')[0].count;

    res.json({ success: true, data: { totalBooks, availableBooks, activeLoans, overdueLoans, totalMembers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use(errorHandler);

async function start() {
  await getDb();
  if (require.main === module) {
    app.listen(PORT, () => console.log(`Library server running on http://localhost:${PORT}`));
  }
}

start();

module.exports = app;