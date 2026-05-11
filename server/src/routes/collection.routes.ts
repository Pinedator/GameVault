import { Router } from "express";
import { collectionController } from "../controllers/collection.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", collectionController.getAll);
router.post("/", collectionController.add);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.remove);

export default router;