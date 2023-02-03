import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import isRegistrationValid from "../utils/isRegistrationValid.js";

const register = async (req, res, db, secret) => {
  const { username, email, password } = req.body;
  const id = uuidv4();
  console.log("💙 email: ", email, "password: ", password, "secret: ", secret);

  const isValid = await isRegistrationValid(email, password);
  if (!isValid) {
    console.log("\nUser not added 🚫");
    return res.status(400).json("Registration request is invalid");
  } else {
    const hash = bcrypt.hashSync(password, 10);

    const users = await db.query(
      "INSERT INTO users (id, email, password, username) VALUES($1, $2, $3, $4) RETURNING *",
      [id, email, hash, username]
    );
    const user = users.rows[0];

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).json({ user: user, token });

    console.log("\nUser added ✅");
  }
};

export default register;
