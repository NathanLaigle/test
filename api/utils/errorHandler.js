module.exports = (error, req, res) => {
  res.json({
    message: error.message || 'Something went wrong',
    error: error.error,
  });
};
