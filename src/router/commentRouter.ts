import { Router } from "express";
import { commentController } from "../controller";

const router: Router = Router();

router.get("/designer", commentController.getDesignerComment);

router.get("/project", commentController.getProjectComment);

export default router;
