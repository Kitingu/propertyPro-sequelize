import express from "express";
import userController from "../controllers/user";
import Validate from "../middlewares/validators";

const router = express.Router();
router.post("/auth/signup", Validate.user, userController.signUp);
router.get("/auth/users", userController.getAllUsers);
router.post("/auth/signin",userController.signIn)
export default router;
