const MIN_SECRET_LENGTH = 32;

// Returns a list of problems with the environment (empty list = fine).
function validateEnv(env = process.env) {
  const problems = [];

  if (!env.MONGO_URI) {
    problems.push("MONGO_URI is missing (your MongoDB Atlas connection string)");
  }

  if (!env.JWT_SECRET) {
    problems.push("JWT_SECRET is missing");
  } else if (env.JWT_SECRET.length < MIN_SECRET_LENGTH) {
    problems.push(
      `JWT_SECRET is too short (${env.JWT_SECRET.length} characters, need at least ${MIN_SECRET_LENGTH}). ` +
        `Generate one with: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
    );
  }

  if (env.NODE_ENV === "production" && !env.CLIENT_ORIGIN) {
    problems.push("CLIENT_ORIGIN is missing (the web address of your deployed frontend, e.g. https://my-app.vercel.app)");
  }

  return problems;
}

// "https://a.app/, http://localhost:5173"  ->  ["https://a.app", "http://localhost:5173"]
// Browsers send origins WITHOUT a trailing slash, so a slash in the setting would block every request.
function parseOrigins(value) {
  return String(value || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

module.exports = { validateEnv, parseOrigins, MIN_SECRET_LENGTH };