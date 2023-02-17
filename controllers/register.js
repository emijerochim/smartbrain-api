import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res, db) => {
  const { username, email, password } = req.body;
  const id = uuidv4();

  const isRegistrationValid = async (email, password) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailRegex.test(email) && passwordRegex.test(password);
  };

  if (!(await isRegistrationValid(email, password))) {
    console.log("\nUser not added 🚫");
    return res.status(400).json("Registration request is invalid");
  } else {
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
  }
};

export default register;
