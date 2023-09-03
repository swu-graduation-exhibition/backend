import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log("hello swu exhibition");
});

export default app;
