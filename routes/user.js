import express from "express";
import userController from "../controllers/user";
const router = express.Router();
router.post("/auth/signup", userController.signUp);
router.get("/auth/users", userController.getAllUsers);
router.post("/auth/signin",userController.signIn)
export default router;
