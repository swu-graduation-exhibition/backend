import { Router } from "express";
import { designerController } from "../controller";

const router: Router = Router();

router.get("/list", designerController.list);

router.get("/:designerId", designerController.single);

export default router;
