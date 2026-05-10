function errorHandler(err, req, res, next) {
  console.error(err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
}

module.exports = errorHandler;