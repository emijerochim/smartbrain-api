import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res, db) => {
  const { username, email, password } = req.body;
  const id = uuidv4();

  const isUsernameAvailable = async (username) => {
    const users = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = users.rows[0];
    return user ? false : true;
  };

  const isEmailAvailable = async (email) => {
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = users.rows[0];
    return user ? false : true;
  };

  const isEmailValid = async (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const isPasswordValid = async (password) =>
    /(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password);

  const isUsernameValid = (username) =>
    username.length >= 3 && username.length <= 20;

  if (!(await isUsernameAvailable(username))) {
    console.log("\nUsername not available on registration 🚫");
    return res.status(402).json("Username not available on registration 🚫");
  }
  if (!(await isEmailAvailable(email))) {
    console.log("\nEmail not available on registration 🚫");
    return res.status(403).json("Email not available on registration 🚫");
  }
  if (!(await isEmailValid(email))) {
    console.log("\nIncorrect format for email on registration 🚫");
    return res
      .status(400)
      .json("Incorrect format for email on registration 🚫");
  }
  if (!(await isPasswordValid(password))) {
    console.log("\nIncorrect format for password on registration 🚫");
    return res
      .status(401)
      .json("Incorrect format for password on registration 🚫");
  }
  if (!isUsernameValid(username)) {
    console.log("\nIncorrect format for username on registration 🚫");
    return res
      .status(404)
      .json("Incorrect format for username on registration 🚫");
  }

  const users = await db.query(
    "INSERT INTO users (id, email, password, username) VALUES($1, $2, $3, $4) RETURNING *",
    [id, email, hash, username]
  );
  const user = users.rows[0];
  const hash = bcrypt.hashSync(password, 10);

  const token = jwt.sign({ id: user.id }, "secretKey", {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: user, token });

  console.log("\nUser added ✅");
};

export default register;
