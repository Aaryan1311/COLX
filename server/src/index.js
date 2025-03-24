import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

//connect to db
connectDB();

// port
const port = 8080;

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
}
)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
