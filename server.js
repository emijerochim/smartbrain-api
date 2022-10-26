require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const knex = require("knex");

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
});

app.get("/", (req, res) => {
  res.send("success!!!");
});

app.post("/signIn", signIn.handleSignIn(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.API_PORT, () => {
  console.log("app is running on port", process.env.API_PORT);
});
