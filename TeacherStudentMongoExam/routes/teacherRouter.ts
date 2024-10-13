import { Router } from "express";
import * as gradesController from "../controllers/gradesController.js";
import { getAllUsers } from "../controllers/usersController.js";
import { teacherMiddleware } from "../middleware/teacherMiddleware.js";
const router = Router();

router.use(teacherMiddleware);

router
  .route("/grade/:id")
  .get(gradesController.getGrades)
  .post(gradesController.addGrade)
  .delete(gradesController.removeGrade)
  .put(gradesController.updateGrade);

router.route("/avgGrade/:id").get(gradesController.getAverageGrade);

router.route("/deleteStudent:id").get(gradesController.deleteStudent);

router.route("/allUsers").get(getAllUsers);

export default router;
