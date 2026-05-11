import { Request, Response, NextFunction } from "express";
import { collectionService } from "../services/collection.service";

export const collectionController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const entries = await collectionService.getAll(userId);
      res.status(200).json(entries);
    } catch (error) {
      next(error);
    }
  },

  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const entry = await collectionService.add(userId, req.body);
      res.status(201).json(entry);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;
      const safeId = Array.isArray(id) ? id[0] : id;
      const entry = await collectionService.update(userId, safeId, req.body);
      res.status(200).json(entry);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;
      const safeId = Array.isArray(id) ? id[0] : id;
      await collectionService.remove(userId, safeId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};