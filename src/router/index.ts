import { Router } from "express";
import projectRouter from "./projectRouter";
import designerRouter from "./designerRouter";
import commentRouter from "./commentRouter";

const router: Router = Router();

router.use("/project", projectRouter);
router.use("/designer", designerRouter);
router.use("/comment", commentRouter);

export default router;
