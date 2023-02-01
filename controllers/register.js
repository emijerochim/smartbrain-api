import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import isRegistrationValid from "../utils/isRegistrationValid.js";

const handleRegister = async (req, res, db, secret) => {
  const { username, email, password } = req.body;
  const id = uuidv4();

  const isValid = await isRegistrationValid(email, password);
  if (!isValid) {
    console.log("\nUser not added 🚫");
    return res.status(400).json("Registration request is invalid");
  }

  const hash = bcrypt.hashSync(password, 10);

  const newUser = await db.query(
    "INSERT INTO users (email, password, username, id) VALUES($1, $2, $3, $4) RETURNING *",
    [email, hash, username, id]
  );

  const token = jwt.sign({ id: newUser.id }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: newUser.rows[0], token });

  console.log("\nUser added ✅");
};

export default handleRegister;
