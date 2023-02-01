import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "./utils/verifyToken.js";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;

import image from "./controllers/image.js";
import handleLogin from "./controllers/login.js";
import register from "./controllers/register.js";

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
app.use(cors());

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
  login(req, res, db, process.env.JWT_KEY);
});

app.post("/register", (req, res) => {
  register(req, res, db, process.env.JWT_KEY);
});

app.put("/image", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : image.handleApiCall(req, res, db);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
