import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.use(
    cors({
        credentials: true,
    })
);
app.use(express.json());

app.use("/", router);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("server running");
});

app.listen(PORT, () => {
    console.log("hello swu exhibition");
});

app.use(errorHandler);

export default app;
