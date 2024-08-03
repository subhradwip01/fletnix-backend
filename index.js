require("dotenv").config();
const cors = require('cors');
const authRouter = require("./routes/auth")
const showRouter = require("./routes/show")
const app = require("express")();
const port = process.env.PORT;
const bodyParser = require("express").json;
const mongoose = require("mongoose");
const { ROUTES } = require("./constants/routes");


app.use(cors());
app.use(bodyParser());
app.use(`${ROUTES.BASE}${ROUTES.AUTH.BASE}`, authRouter);
app.use(`${ROUTES.BASE}${ROUTES.SHOW.BASE}`, showRouter)
app.listen(port, async () => {
 
  await mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
      // console.log("Successfully DB connected ");
    })
    .catch((error) => {
      // console.log(`can not connect to database, ${error}`);
    });
});

module.exports = app;