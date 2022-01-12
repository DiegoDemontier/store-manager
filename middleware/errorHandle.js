module.exports = (err, req, res, _next) => {
  const message = {
    code: 'invalid_data',
    message: err.message,
  };

  if (err.status) {
    return res.status(err.status).json({ err: message, desc: err.description });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};