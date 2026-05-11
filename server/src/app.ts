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

app.use(cors({
  origin: ["https://game-vault-ashy-six.vercel.app", "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());

app.use("/api/games", gamesRoutes);
app.use("/api/collection", collectionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🎮 GameVault server running on http://localhost:${PORT}`);
});

export default app;