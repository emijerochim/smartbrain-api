const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1369",
    database: "smartbrain",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success!!!");
});
app.post("/signin", signin.handleSignin(db, bcrypt)(req, res));
app.post("/register", register.handleRegister(db, bcrypt)(req, res));
app.get("/profile/:id", profile.handleProfileGet(db)(req, res));
app.put("/image", image.handleImage(db)(req, res));
app.post('/imageurl', image.handleApiCall(req,res))

app.listen(3001, () => {
  console.log("app is running...");
});
