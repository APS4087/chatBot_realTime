import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

// api/auth/signup route
router.post("/signup", signup);

// api/auth/login route
router.post("/login", login);

// api/auth/logout route
router.post("/logout", logout);

export default router;