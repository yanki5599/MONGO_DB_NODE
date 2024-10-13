import express from "express";
import * as authController from "../controllers/authController.js";

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
 *                      passportId:
 *                        type: string
 *                      password:
 *                        type: string
 *                    example:
 *                      passportId: 123456789
 *                      password: password
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
