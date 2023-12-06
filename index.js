const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/baseRouter");
const env = require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose
  .connect(process.env.MONGOBD_CONNECTION)
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err, "DB ERROR");
  });

app.listen(process.env.PORT, () => {
  console.log("server started successfully");
});
