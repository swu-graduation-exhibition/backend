import { Router } from "express";
import { commentController } from "../controller";

const router: Router = Router();

router.get("/designer", commentController.designer);

router.get("/project", commentController.project);

export default router;
