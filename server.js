require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./utils/verifyToken");
const register = require("./controllers/register");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const cors = require("cors");
const { Client } = require("pg");

const db = new Client({
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Database connected ", process.env.PGHOST);
  }
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://smartbrain-production.up.railway.app",
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send();
});

app.get("/", verifyToken, (req, res) => {
  res.send("success!!!");
});

app.post("/login", (req, res) => {
  login.handleLogin(req, res, db, process.env.JWT_KEY);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, process.env.JWT_KEY);
});

app.get("/profile/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : profile.handleProfileGet(req, res, db);
  });
});

app.put("/image", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : image.handleImage(req, res, db);
  });
});

app.post("/imageUrl", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : image.handleApiCall(req, res);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

//xd
