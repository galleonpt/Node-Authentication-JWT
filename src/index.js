const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");

const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");

app.use(express.json())

env.config();

mongoose.set('useCreateIndex', true);

mongoose.connect(
  process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => console.log("db connected")
);

//para usar o authRout é preciso ter o prefixo de /users
app.use("/users", authRoute);
//prefixo para rota privada de posts
app.use("/posts", privateRoute);

app.listen(3333);