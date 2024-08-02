require("dotenv").config();
const cors = require('cors');
const authRouter=require("./routes/auth")
const app = require("express")();
const port = process.env.PORT;
const bodyParser = require("express").json;
require("./config/db");


app.use(cors());
app.use(bodyParser());
app.use("/api/auth",authRouter)
app.listen(port, () => {
  console.log("Server started");
});