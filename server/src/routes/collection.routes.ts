import { Router } from "express";
import { collectionController } from "../controllers/collection.controller";

const router = Router();

router.get("/", collectionController.getAll);
router.post("/", collectionController.add);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.remove);

export default router;