// Small helpers that stop hostile input from reaching MongoDB.

// Copies ONLY the listed keys. Everything else (user, $set, $unset, ...) is dropped.
function pick(source, allowedKeys) {
  const result = {};
  if (!source || typeof source !== "object") return result;
  for (const key of allowedKeys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
}

// True only for a real id string such as "507f1f77bcf86cd799439011".
// Rejects objects like { "$ne": null }, which MongoDB would treat as a query operator.
function isIdString(value) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}

// Makes user text safe to put inside a regular expression ("(" becomes "\(").
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = { pick, isIdString, escapeRegex };