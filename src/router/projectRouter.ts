import { Router } from "express";
import { projectController } from "../controller";

const router: Router = Router();

// get single flower vote result in library
router.get("/list", projectController.list);

export default router;
