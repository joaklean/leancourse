const { ZodError } = require('zod');
const { NotFoundError, AuthenticationError } = require('../errors/customErrors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.errors });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;