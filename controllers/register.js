import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import isRegistrationValid from "../utils/isRegistrationValid.js";

const handleRegister = async (req, res, db, secret) => {
  const { username, email, password } = req.body;

  const isValid = await isRegistrationValid(email, password);
  if (!isValid) {
    console.log("\nUser not added 🚫");
    return res.status(400).json("Registration request is invalid");
  }

  const hash = bcrypt.hashSync(password, 10);

  const newUser = await db.query(
    "INSERT INTO users (email, password, username) VALUES($1, $2, $3) RETURNING *",
    [email, hash, username]
  );

  const token = jwt.sign({ id: newUser.id }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: newUser.rows[0], token });

  console.log("\nUser added ✅");
};

export default {
  handleRegister: handleRegister,
};
