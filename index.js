const { mongoose } = require("mongoose");
require("dotenv").config();
const router = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port;
const db_url = process.env.db_url;

app.use(cors({ origin: "*" }));

const connectdb = async (db_url) => {
  const DB_OPTION = {
    dbname: process.env.db_name,
  };
  mongoose
    .connect(db_url, DB_OPTION)
    .then(() => {
      console.log("connected succesfully...!!!!!");

      app.use(express.json());
      
      app.use("/api", router);

      app.listen(port, () => console.log(`app listening on port ${port}!`));
    })
    .catch((error) => {
      console.log("error connecting to mongodb:", error);
    });
};

connectdb(db_url);
