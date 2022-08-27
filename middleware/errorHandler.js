const { CustomAPIError } = require("../errors/customError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ error: message });
  }
  return res.status(500).json({ error });
};

module.exports = errorHandler;
