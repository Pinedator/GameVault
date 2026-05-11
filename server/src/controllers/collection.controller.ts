import { Request, Response, NextFunction } from "express";
import { collectionService } from "../services/collection.service";

export const collectionController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entries = collectionService.getAll();
      res.status(200).json(entries);
    } catch (error) {
      next(error);
    }
  },

  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entry = collectionService.add(req.body);
      res.status(201).json(entry);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const safeId = Array.isArray(id) ? id[0] : id;
      const entry = collectionService.update(safeId, req.body);
      res.status(200).json(entry);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const safeId = Array.isArray(id) ? id[0] : id;
      collectionService.remove(safeId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};