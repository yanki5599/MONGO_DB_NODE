import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login in
 *     requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *                    example:
 *                      email: example@gmail.com
 *                      password: 1234
 *
 *     responses:
 *       201:
 *         description: login
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User logged in successfully"
 *
 *
 */
router.route("/").post(authController.login);

export default router;
