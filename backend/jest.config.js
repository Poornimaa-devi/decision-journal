module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  setupFiles: ["<rootDir>/tests/setupEnv.js"],
  globalSetup: "<rootDir>/tests/globalSetup.js",
  globalTeardown: "<rootDir>/tests/globalTeardown.js",
  // The first run downloads a MongoDB binary, so allow plenty of time.
  testTimeout: 60000,
  // Hides the request logger and error-handler output. Run `npm run test:verbose` to see it.
  silent: true,
  collectCoverageFrom: ["app.js", "controllers/**/*.js", "middleware/**/*.js", "models/**/*.js", "routes/**/*.js"],
};