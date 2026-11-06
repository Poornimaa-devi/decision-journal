const rateLimit = require("express-rate-limit");

const make = (options) =>
  rateLimit({
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message: "Too many requests. Please wait a few minutes and try again." },
    ...options,
  });

// Generous limit for the whole API: stops runaway scripts, never bothers real users.
const apiLimiter = (options = {}) => make({ windowMs: 15 * 60 * 1000, limit: 1000, ...options });

// Strict limit for login/signup, counting only FAILED attempts (stops password guessing).
const authLimiter = (options = {}) =>
  make({ windowMs: 15 * 60 * 1000, limit: 20, skipSuccessfulRequests: true, ...options });

module.exports = { apiLimiter, authLimiter };