function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose validation failed (required, enum, min/max, minlength...)
  if (err.name === "ValidationError") {
    const errors = {};
    for (const [field, detail] of Object.entries(err.errors)) {
      errors[field] = detail.message;
    }
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // Bad ObjectId or wrong type, e.g. /api/goals/not-an-id
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for ${err.path}` });
  }

  // Unique index violated, e.g. signing up with an email that already exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    return res.status(409).json({
      message: `That ${field} is already in use`,
      errors: { [field]: `That ${field} is already in use` },
    });
  }

  // Malformed JSON body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body is not valid JSON" });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong on the server",
  });
}

module.exports = errorHandler;