module.exports = (err, req, res, _next) => {
  const message = {
    code: err.code,
    message: err.message,
  };

  if (err.status) {
    return res.status(err.status).json({ err: message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};