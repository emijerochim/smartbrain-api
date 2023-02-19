import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res, db) => {
  const { email, password } = req.body;

  const users = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = users.rows[0];

  if (!user) {
    console.log("\nEmail not found on login 🚫");
    return res.status(400).json("\nEmail not found on login 🚫");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Password incorrect 🚫");
    return res.status(401).json("Password incorrect 🚫");
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
