module.exports = (err, req, res, next) => {
  res.json({
    message: err.message || 'Something went wrong',
    error: err.error,
  });
};
