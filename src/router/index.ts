import { Router } from "express";
import projectRouter from "./projectRouter";

const router: Router = Router();

router.use("/project", projectRouter);

export default router;
