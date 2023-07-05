import express from "express";
import cookieParser from "cookie-parser";
import initAPI from "./routes/api.js";
import configCors from "./config/cors.js";
import connectDB from "./config/connectDB.js";
import bodyParser from "body-parser";
import JWTmiddleware from "./middleware/JWTmiddleware.js";
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  //console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

require("dotenv").config();


const port = process.env.PORT || 8080;

configCors(app);
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
console.log("JWTmiddleware", JWTmiddleware.createToken());
initAPI(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
