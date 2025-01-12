import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//entpoint
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "message dari entpoint express" });
// });

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    message: "Entpoint dari express",
  });
});

//Parent Router
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

// connect to mongodb
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server listening on http://localhost:${process.env.PORT}`);
});
