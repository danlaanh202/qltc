const express = require("express");
const route = require("./src/routes");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());

const db = require("./src/models");
db.sequelize.sync();
route(app);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
