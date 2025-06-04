// generate-hash.js (CommonJS)
const bcrypt = require("bcrypt");

const password = "supersecret";

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});