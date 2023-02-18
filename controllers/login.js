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
    console.log("Password not found on login 🚫");
    return res.status(401).json("Password not found on login 🚫");
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
