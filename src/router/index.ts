import { Router } from "express";
import projectRouter from "./projectRouter";
import designerRouter from "./designerRouter";

const router: Router = Router();

router.use("/project", projectRouter);
router.use("/designer", designerRouter);

export default router;
