import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res, db, secret) => {
  //check if the token is valid, if it is, return the user and the token
  let { token } = req.body;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("\nToken is invalid 🚫");
        return res.status(401).json("Token is invalid");
      } else {
        console.log("\nToken is valid ✅");
        return res.status(200).json({ user: decoded, token: token });
      }
    });
  }

  //if it isn't, continue with the login process
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

  token = jwt.sign({ username: user.username }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ user: user, token: token });

  console.log("\nUser logged in ✅");
};

export default login;
