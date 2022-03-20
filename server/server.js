import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/api/test", (req, res) => {
  res.send("hello testng")
})
// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));


//Deployment
app.use(express.static(path.join(__dirname, "../client/build")))
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));