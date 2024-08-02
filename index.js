require("dotenv").config();
var cors = require('cors')
const app = require("express")();
const port = process.env.PORT;

require("./config/db");
app.use(cors());
const bodyParser = require("express").json;
app.use(bodyParser());
app.listen(port, () => {
  console.log("Server started");
});