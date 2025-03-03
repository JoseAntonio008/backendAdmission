require("dotenv").config();

const SERVER_KEY = process.env.SERVER_KEY;
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const hashedPassword = (password) => hash(password, 10);
const comparePassword = (password, hashedpass) => compare(password, hashedpass);

const signToken = (payload, expire) =>
  sign(payload, SERVER_KEY, { expiresIn: expire ?? 60 * 60 * 9 }).toString();
const verifyToken = (token, customKey) => {
  try {
    return !token ? null : verify(token, customKey ?? SERVER_KEY);
  } catch (error) {
    console.log(`error in verify token: ${error}`);

    return null;
  }
};

module.exports = {
  hashedPassword,
  comparePassword,
  signToken,
  verifyToken,
};
