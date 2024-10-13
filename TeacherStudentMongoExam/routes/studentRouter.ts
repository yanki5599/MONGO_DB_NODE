import e from "express";
import express from "express";
import * as studentController from "../controllers/studentController.js";
import { studentMiddleware } from "../middleware/studentMiddleware.js";

const router = express.Router();

router.route("/register").post(studentController.register);

router.use(studentMiddleware);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: registers a new user
 *     requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      fullName:
 *                        type: string
 *                      passportId:
 *                        type: string
 *                      password:
 *                        type: string
 *                    example:
 *                      fullName: John Doe
 *                      passportId: 123456789
 *                      password: password
 *
 *     responses:
 *       201:
 *         description: register
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User created successfully"
 *
 *
 */

export default router;
