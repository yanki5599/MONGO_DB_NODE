import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import teacher, { ITeacher } from "../models/teacher";
import * as teacherService from "../services/teacherService";
import * as classRoomService from "../services/classRoomService";
import { IClassRoom } from "../models/classRoom";
import student, { IGrade } from "../models/student";
import * as studentService from "../services/studentService";
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTeacher: ITeacher = req.body;
    const classRoom: IClassRoom = await teacherService.create(
      newTeacher,
      req.body.className
    );

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: { classId: classRoom.id },
    });
  }
);

export const getStudentGrades = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const grades: IGrade[] = await studentService.getGrades(req.params.id);
    res.status(200).json({
      success: true,
      message: "Grades fetched successfully",
      data: grades,
    });
  }
);
export const addGradeForStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    teacherService.validateStudent(req.params.id, (req as any).teacher.id);

    const added: IGrade = await studentService.addGradeForStudent(
      req.params.id,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Grade added successfully",
      data: added,
    });
  }
);
export const updateGradeForStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    teacherService.validateStudent(req.params.id, (req as any).teacher.id);

    const updated = await studentService.updateGrade(req.params.id, req.body);

    res.status(204).json({
      success: true,
      message: "grade updated successfully:",
      data: updated,
    });
  }
);
export const getAllStudents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await teacherService.getStudents((req as any).teacher.id);
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: teacher.students,
    });
  }
);
export const getStudentsAvg = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const StudentsAvg = await teacherService.getStudentsAvg(
      (req as any).teacher.id
    );
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: StudentsAvg,
    });
  }
);
