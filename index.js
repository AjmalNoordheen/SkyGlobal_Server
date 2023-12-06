const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/baseRouter");
const env = require('dotenv').config()

const app = express();

const corsOptions = {
  origin: 'http://example.com', // replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

// Enable CORS with specific options
app.use(cors(corsOptions));
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
