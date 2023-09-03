import { Router } from "express";
import { projectController } from "../controller";

const router: Router = Router();

router.get("/list", projectController.list);

router.get("/:projectId", projectController.single);

export default router;
