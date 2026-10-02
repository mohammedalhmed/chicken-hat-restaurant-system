import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { initializeMenuItems } from "./initialize-data";
import { fileStorage } from "./file-storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  // Ensure file-backed storage is initialized before sample data or routes use it.
  await fileStorage.ready;
  await initializeMenuItems();
  
  const server = await registerRoutes(app);

  // Important: setup Vite or serve static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = Number(process.env.PORT ?? 5000);
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid TCP port");
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`File-based storage system initialized successfully`);
  });
})();