require("dotenv").config(); //config dotenv
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//database connection string
const dbConnectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.kv48y.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

//record routes
const recordRoutes = require("./routes/records");

//express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //handle cors

//routes for express app
app.use("/api/records", recordRoutes);

let deployPort = process.env.PORT || process.env.MY_PORT;
//connect to database
mongoose
  .connect(dbConnectionString)
  .then(() => {
    //listens for requests
    app.listen(deployPort, () => {
      console.log(`Connected to DB, listening on port: ${deployPort}`);
    });
  })
  .catch((err) => console.log(err));
