import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handleLogin = async (req, res, db, secret) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (!user.rows[0]) {
    console.log("\nUser not found 🚫");
    return res.status(404).json("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    console.log("\nIncorrect password 🚫");
    return res.status(401).json("Incorrect password");
  }

  const token = jwt.sign({ username: user.rows[0].username }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: user.rows[0], token });

  console.log("\nUser logged in ✅");
};

export default {
  handleLogin: handleLogin,
};
