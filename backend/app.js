require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routes
const selectionRoute = require('./routes');
// DBconnection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.error("Error: ", err));

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// My Routes
app.get(selectionRoute(app));

// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// PORT
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
