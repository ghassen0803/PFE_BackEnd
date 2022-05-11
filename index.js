console.clear();
const express = require("express");
const app = express();
const pool = require("./config/db");


require("dotenv").config();

pool.connect();

app.use(express.json());

app.use("/api/user", require("./router/user"));
app.use("/api", require("./router/article"));
app.use("/api", require("./router/reservation"));


  




// PORT
const PORT = process.env.PORT;

// create server
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);