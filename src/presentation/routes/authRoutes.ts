import { Router } from "express";

import { LoginController } from "@/presentation/controllers/auth/LoginController";

export const authRoutes = (loginController: LoginController) => {
  const router = Router();

  router.post("/auth/login", async (req, res, next) => {
    try {
      await loginController.handle(req, res);
    } catch (error) {
      next(error);
    }
  });

  return router;
};