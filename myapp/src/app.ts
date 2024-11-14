import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.js";
import { console } from "inspector";

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
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
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

const createUser = async (name: string, email: string) => {
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

  const User = mongoose.model("User", schema);

  // const user = new User({
  //   name,
  //   email,
  // });

  // try {
  //   const result = await user.save();
  //   console.log(result + "User Created");
  // } catch (err) {
  //   console.log(err);
  // }

  await User.create({ name, email });

  console.log("User Created");
};

// const createUsers = async () => {
//   await createUser("John", "johnDoe3@gmail.com");
// };

// createUsers();

// createUser("John", "johnDoe6@gmail.com");