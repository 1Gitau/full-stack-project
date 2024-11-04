import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import bcrypt from "bcryptjs";
import { createBlog } from "./controllers/Blogs.controllers.js";
import verifyToken from "./controllers/middleware/verifyToken.js";

const client = new PrismaClient();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieparser());

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName) {
      res.status(400).json({ message: "First name is required" });
      return;
    }
    if (!lastName) {
      res.status(400).json({ message: "Last name is required" });
      return;
    }
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// app.post("/login", async (req, res) )
app.post("/create-blog", verifyToken, createBlog);
app.post("/login/auth", async (req, res) => {
  try {
    //read the email and password from the user
    const email = req.body.email;
    const password = req.body.password;

    //check if the user exists in the database
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "wrong email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "wrong email or password" });
      return;
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("authToken", token, { httpOnly: true })
      .json({ message: "login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
