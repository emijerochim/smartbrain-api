require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const register = require("./controllers/register");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DB_URL,
    ssl: true,
  },
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/login", (req, res) => {
  login.handleLogin(req, res, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
