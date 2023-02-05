import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res, db, secret) => {
  const { email, password } = req.body;

  const users = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = users.rows[0];

  if (!user) {
    console.log("\nUser not found 🚫");
    return res.status(404).json("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("\nIncorrect password 🚫");
    return res.status(401).json("Incorrect password");
  }

  jwt.sign({ user }, "secretKey", { expiresIn: "7d" }, (err, token) => {
    res.status(200).json({
      token,
      user,
    });
  });

  console.log("\nUser logged in ✅");
};

export default login;
