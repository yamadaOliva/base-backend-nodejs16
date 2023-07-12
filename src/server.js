import express from "express";
import cookieParser from "cookie-parser";
import initAPI from "./routes/api.js";
import configCors from "./config/cors.js";
import connectDB from "./config/connectDB.js";
import bodyParser from "body-parser";
import JWTmiddleware from "./middleware/JWTmiddleware.js";
const app = express();
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: function (req, res) {
    res.status(429).send({
        status: 500,
        message: 'Too many requests!',
    });
},
skip: (req, res) => {
    if(req.ip === '::ffff:127.0.0.1')
        return true;
    return false;
}
});
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
    // Khi client disconnect thì log ra terminal.
  });
});

require("dotenv").config();

const port = process.env.PORT || 8080;

configCors(app);
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
console.log("JWTmiddleware", JWTmiddleware.createToken());
initAPI(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
