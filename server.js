import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "./utils/verifyToken.js";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;

import image from "./controllers/image.js";
import login from "./controllers/login.js";
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
    console.error("🔴 Database connection error\n", err.stack);
  } else {
    console.log("📁 Database connected \n", process.env.PGHOST);
  }
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://smartbrain-production.up.railway.app",
      "https://smartbrain-production.up.railway.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  login(req, res, db, process.env.JWT_KEY);
});

app.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  register(req, res, db, process.env.JWT_KEY);
});

app.put("/image", verifyToken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : image.handleApiCall(req, res, db);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`\n💚 APp is running on \n🔌 PORT ${process.env.PORT}\n`);
});
