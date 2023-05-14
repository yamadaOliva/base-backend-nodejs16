import express from "express";
import cookieParser from "cookie-parser";
import initAPI from "./routes/api.js";
import configCors from "./config/cors.js";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

configCors(app);

initAPI(app);

app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
}
);



