import { Router } from "express";
import { gamesController } from "../controllers/games.controller";

const router = Router();

router.get("/search", gamesController.search);
router.get("/:id", gamesController.getById);

export default router;