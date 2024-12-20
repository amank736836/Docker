import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { errorMiddleware, TryCatch } from "./middlewares/error.js";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app = express();

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: "DockerTut",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  // createUsers();
  const num = Math.floor(Math.random() * 1000) + 1;
  const message = await createUser("John", `johnDoe${num}@gmail.com`);
  res.send(`Hello World! ${message} With Email: johnDoe${num}@gmail.com`);
});

app.post(
  "/api/newuser",
  TryCatch(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error("Name and Email are required");
    }

    const message = await createUser(name as string, email as string);
    res.json({
      success: true,
      message,
    });
  })
);

app.get("/delete", (req, res) => {
  mongoose.connection.dropDatabase();
  console.log("Database Deleted");
  res.json({
    success: true,
    message: "Database Deleted",
  });
});

// your routes here

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", schema);

const createUser = async (name: string, email: string) => {
  console.log("Creating User");

  const user = new User({
    name,
    email,
  });

  try {
    const result = await user.save();
    console.log(result + "User Created");
    return "User Created";
  } catch (err) {
    console.log("Error Occured");
    console.log(err);
    return JSON.stringify(err);
  }

  // try {
  //   await User.create({ name, email });
  //   console.log("User Created");
  // } catch (error) {
  //   console.log("Error Occured");
  //   console.log(error);
  // }
};

const createUsers = async () => {
  // get random number between 1-100
  const num = Math.floor(Math.random() * 1000) + 1;
  await createUser("John", `johnDoe${num}@gmail.com`);
};

// createUsers();

// createUser("John", "johnDoe2@gmail.com");
