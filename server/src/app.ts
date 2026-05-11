import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import gamesRoutes from "./routes/games.routes";
import collectionRoutes from "./routes/collection.routes";

import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use("/api/games", gamesRoutes);
app.use("/api/collection", collectionRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🎮 GameVault server running on http://localhost:${PORT}`);
  });
}

export default app;