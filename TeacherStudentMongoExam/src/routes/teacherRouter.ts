import { Router } from "express";
import * as teacherController from "../controllers/teacherController";
import { teacherMiddleware } from "../middleware/teacherMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

/**
 * @swagger
 * /teacher/register:
 *   post:
 *     summary: registers a new teacher
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
 *                    example: "Teacher created successfully"
 *
 *
 */

router.route("/register").post(teacherController.register);
router.use(authMiddleware);
router.use(teacherMiddleware);

router
  .route("/grade/:id")
  .get(teacherController.getStudentGrades)
  .post(teacherController.addGradeForStudent)
  .put(teacherController.updateGradeForStudent);

router.get("/getAllStudents", teacherController.getAllStudents);
router.get("/StudentsAvg", teacherController.getStudentsAvg);
export default router;
