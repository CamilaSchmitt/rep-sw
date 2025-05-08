import { Router } from "express";
import { LoginController } from "../controller/login-controller";

const loginRoutes = Router();
const loginController = new LoginController();

loginRoutes.post("/login", loginController.doLogin);
loginRoutes.post("/register", loginController.register);

export default loginRoutes;