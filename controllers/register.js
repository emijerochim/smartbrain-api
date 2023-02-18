import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res, db) => {
  const { username, email, password } = req.body;
  const id = uuidv4();

  const isEmailValid = async (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
  };

  const isPasswordValid = async (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  if (!(await isEmailValid(email))) {
    console.log("\nIncorrect format for email 🚫");
    return res.status(401).json("Incorrect format for email");
  }
  if (!(await isPasswordValid(password))) {
    console.log("\nIncorrect format for password 🚫");
    return res.status(402).json("Incorrect format for password");
  }
  const hash = bcrypt.hashSync(password, 10);

  const users = await db.query(
    "INSERT INTO users (id, email, password, username) VALUES($1, $2, $3, $4) RETURNING *",
    [id, email, hash, username]
  );
  const user = users.rows[0];

  const token = jwt.sign({ id: user.id }, "secretKey", {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: user, token });

  console.log("\nUser added ✅");
};

export default register;
