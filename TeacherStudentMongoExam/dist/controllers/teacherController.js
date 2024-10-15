"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsAvg = exports.getAllStudents = exports.updateGradeForStudent = exports.addGradeForStudent = exports.getStudentGrades = exports.register = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const teacherService = __importStar(require("../services/teacherService"));
const studentService = __importStar(require("../services/studentService"));
exports.register = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeacher = req.body;
    const classRoom = yield teacherService.create(newTeacher, req.body.className);
    res.status(201).json({
        success: true,
        message: "Teacher created successfully",
        data: { classId: classRoom.id },
    });
}));
exports.getStudentGrades = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const grades = yield studentService.getGrades(req.params.id);
    res.status(200).json({
        success: true,
        message: "Grades fetched successfully",
        data: grades,
    });
}));
exports.addGradeForStudent = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    teacherService.validateStudent(req.teacher.id, req.params.id);
    const added = yield studentService.addGradeForStudent(req.params.id, req.body);
    res.status(201).json({
        success: true,
        message: "Grade added successfully",
        data: added,
    });
}));
exports.updateGradeForStudent = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    teacherService.validateStudent(req.params.id, req.teacher.id);
    const updated = yield studentService.updateGrade(req.params.id, req.body);
    res.status(204).json({
        success: true,
        message: "grade updated successfully:",
        data: updated,
    });
}));
exports.getAllStudents = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherService.getStudents(req.teacher.id);
    res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: teacher.students,
    });
}));
exports.getStudentsAvg = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const StudentsAvg = yield teacherService.getStudentsAvg(req.teacher.id);
    res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: StudentsAvg,
    });
}));
