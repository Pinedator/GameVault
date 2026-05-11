import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import path from "path";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.resolve(__dirname, "../../firebase-admin.json")
    ),
  });
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    (req as any).userId = decoded.uid;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}