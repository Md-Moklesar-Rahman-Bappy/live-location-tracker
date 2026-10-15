import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { config, corsAllowedOrigins, isProduction } from "./config";
import authRoutes from "./routes/auth";
import sessionRoutes from "./routes/sessions";
import publicRoutes from "./routes/public";
import healthRoutes from "./routes/health";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser(config.SESSION_SECRET));
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || corsAllowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/health", healthRoutes);

app.get("/", (_req, res) => {
  res.json({ name: "Live Location Tracker API", status: "running" });
});

export default app;
