import express from "express";
import cors from "cors";
import path from "path";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";


import userRoutes from "./route/userRoutes";
import productRoutes from "./route/productRoutes";
import commentRoutes from "./route/commentRoutes";


const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
// `credentials: true` allows the frontend to send cookies to the backend so that we can authenticate the user.
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).

app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

// // Serve frontend in production
// if (ENV.NODE_ENV === "production") {
//   const __dirname = path.resolve();

//   // Serve static files
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   // SPA fallback (send all non-API routes to React)
//   app.get("/*", (req, res) => {
//     // Avoid sending index.html for API routes
//     if (req.path.startsWith("/api")) {
//       return res.status(404).json({ error: "API route not found" });
//     }
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));