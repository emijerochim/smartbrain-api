import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import pkg from "pg";
import verifyToken from "./verifyToken.js";
import login from "./controllers/login.js";
import register from "./controllers/register.js";
import box from "./controllers/box.js";

const { Client } = pkg;
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
      "https://smartbrain-production.up.railway.app",
      "http://localhost:3000",
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send("success!!!");
});

app.post("/verify-token", (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
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

app.post("/image", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(box(req, res, db));
  });
});

app.listen(process.env.PORT, () => {
  console.log(`\n💚 app is running on \n🔌 port ${process.env.PORT}\n`);
});
