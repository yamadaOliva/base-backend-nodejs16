import express from 'express';
const router = express.Router();

const initAPI = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello World!");
    });
    return app.use("/api", router);
}

export default initAPI;