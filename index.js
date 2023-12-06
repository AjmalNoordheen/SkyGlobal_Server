const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/baseRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose
  .connect("mongodb://127.0.0.1:27017/skyGoal")
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err, "DB ERROR");
  });

app.listen(3000, () => {
  console.log("server started successfully");
});
