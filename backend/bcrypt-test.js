const bcrypt = require("bcrypt");

async function testHashing() {
  const plainPassword = "mySecret123";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed password:", hashedPassword);

  const isMatchCorrect = await bcrypt.compare("mySecret123", hashedPassword);
  console.log("Correct password match?", isMatchCorrect);

  const isMatchWrong = await bcrypt.compare("wrongGuess", hashedPassword);
  console.log("Wrong password match?", isMatchWrong);
}

testHashing();