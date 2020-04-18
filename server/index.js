const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
//const http = require("http");
require("dotenv").config();
const router = express.Router();
const app = express();
//const server = http.createServer(app);
//const io = require("socket.io").listen(server);
//const SocketApi = require("./socket/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors?
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join("__dirname", "..", "build")));

require("./auth/passport");

let upload = path.join("./build", "upload");
if (!fs.existsSync(upload)) {
  fs.mkdirSync(upload);
}

app.use(require("./routes/index.js"));

router.get("*", (_req, res) => {
  res.sendFile = fs.readFileSync(
    path.resolve(path.join("__dirname", "..", "build", "index.html")),
    "utf8"
  );
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    const url = `mongodb+srv://olga:${process.env.MONGO_PASSWORD}@cluster0-dwk9a.mongodb.net/loftsystem?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log('Environment', process.env.NODE_ENV)
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (e) {
    console.log(e);
  }
}


start();

