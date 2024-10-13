import express from "express";
import * as studentController from "../controllers/studentController";
import { studentMiddleware } from "../middleware/studentMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: registers a new student
 *     requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      fullName:
 *                        type: string
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *                      className:
 *                        type:string
 *                    example:
 *                      fullName: John Doe
 *                      email: example@gmail.com
 *                      password: 1234
 *                      className: moshe
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
 *                    example: "Student created successfully"
 *
 *
 */
router.route("/register").post(studentController.register);

router.use(authMiddleware);
router.use(studentMiddleware);

/**
 * @swagger
 * /student/grades:
 *   get:
 *     summary: get student grades
 *     responses:
 *       200:
 *         description: get grades
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  grades:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        note:
 *                          type: string
 *                          example: "A"
 *                        grade:
 *                          type: number
 *                           example: 90
 *                        _id:
 *                          type: string
 *                          example: "5f5f5f5f5f5f5f5f5f5f5f5f"
 *
 */
router.route("/grades").get(studentController.getGrades);
export default router;
