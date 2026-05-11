import { Request, Response, NextFunction } from "express";
import { gamesService } from "../services/games.service";

export const gamesController = {
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ error: "Query parameter 'q' is required" });
        return;
      }
      const games = await gamesService.search(query);
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid game ID" });
        return;
      }
      const game = await gamesService.getById(id);
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  },
};