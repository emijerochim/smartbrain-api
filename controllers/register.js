// Path: controllers\register.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleRegister = (req, res, db, bcrypt, secret) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            entries: 0,
            joined: new Date(),
          })
          .then((user) => {
            // generate JWT
            const payload = {
              id: user[0].id,
              email: user[0].email,
            };
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            res.json({ user: user[0], token });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
