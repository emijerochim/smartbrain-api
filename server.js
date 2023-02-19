import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import pkg from "pg";
import box from "./controllers/box.js";
import login from "./controllers/login.js";
import register from "./controllers/register.js";
import verifyToken from "./controllers/verifyToken.js";
import retry from "promise-retry";

const { Client } = pkg;
const db = new Client({
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const connectToDatabase = () => {
  return retry(
    async (retry, number) => {
      console.log(`Connecting to database (attempt ${number})...`);
      return new Promise((resolve, reject) => {
        db.connect((err) => {
          if (err) {
            console.error(
              `🔴 Database connection error (attempt ${number})\n`,
              err.stack
            );
            retry(err);
          } else {
            console.log(
              `📁 Database connected (attempt ${number}) \n`,
              process.env.PGHOST
            );
            resolve();
          }
        });
      });
    },
    {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 5000,
    }
  );
};

connectToDatabase()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
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
  res.header("Access-Control-Allow-Origin", "*");
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
});

app.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  login(req, res, db);
});

app.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  register(req, res, db);
});

app.post("/verify-token", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
});

app.post("/image", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : box(req, res);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`\n💚 app is running on \n🔌 port ${process.env.PORT}\n`);
});
