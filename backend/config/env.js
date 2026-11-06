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

  return problems;
}

module.exports = { validateEnv, MIN_SECRET_LENGTH };