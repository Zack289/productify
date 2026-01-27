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


app.get('/',(req,res)=>{
    res.send("Hello from Home page")
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, ()=>{
    console.log(`App is running in http://localhost:${ENV.PORT}`);
})