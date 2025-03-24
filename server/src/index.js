import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());


//connect to db
connectDB();

// port
const port = 3000;

// rest object

// middleware

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
