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
exports.updateGrade = exports.addGradeForStudent = exports.getGrades = exports.getStudentById = exports.create = void 0;
exports.getStudentByUserId = getStudentByUserId;
const errorTypes_1 = require("../models/errorTypes");
const student_1 = __importDefault(require("../models/student"));
const errorStatusConstants_1 = __importDefault(require("../models/errorStatusConstants"));
const userService = __importStar(require("./userService"));
const role_1 = require("../models/role");
const classRoomService = __importStar(require("./classRoomService"));
const create = (newStudent, className) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!className)
        throw new errorTypes_1.ErrorWithStatusCode("ClassName missing.", errorStatusConstants_1.default.BAD_REQUEST);
    const teacher = yield classRoomService.getClassRoomTeacher(className);
    if (!teacher)
        throw new errorTypes_1.ErrorWithStatusCode("Classroom not found.", 404);
    newStudent.role = role_1.Role.STUDENT;
    const addedUser = yield userService.createUser(newStudent);
    try {
        newStudent.userId = addedUser._id;
        const added = yield student_1.default.create(newStudent);
        // add student id to teachers students array
        (_a = teacher.students) === null || _a === void 0 ? void 0 : _a.push(added._id);
        yield teacher.save();
        return yield added.populate("userId");
    }
    catch (error) {
        throw new errorTypes_1.ErrorWithStatusCode(error.message, 400);
    }
});
exports.create = create;
const getStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("studentId", studentId);
    const student = yield student_1.default.findById(studentId).populate("userId");
    if (!student)
        throw new errorTypes_1.ErrorWithStatusCode("Student not found.", 404);
    return student;
});
exports.getStudentById = getStudentById;
const getGrades = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_1.default.findById(studentId);
    if (!student)
        throw new errorTypes_1.ErrorWithStatusCode("Student not found.", 404);
    return student.grades;
});
exports.getGrades = getGrades;
const addGradeForStudent = (studentId, grade) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield student_1.default.findByIdAndUpdate(studentId, {
            $push: {
                grades: grade,
            },
        }, { new: true });
        if (!updatedStudent) {
            throw new errorTypes_1.ErrorWithStatusCode("Student not found.", errorStatusConstants_1.default.NOT_FOUND);
        }
        return updatedStudent.grades[updatedStudent.grades.length - 1];
    }
    catch (err) {
        throw new errorTypes_1.ErrorWithStatusCode(err.message, errorStatusConstants_1.default.BAD_REQUEST);
    }
});
exports.addGradeForStudent = addGradeForStudent;
const updateGrade = (studentId, grade) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield student_1.default.findByIdAndUpdate({ studentId, "grades.id": grade._id }, { $set: { "grades.$": grade } }, { new: true });
        return updatedStudent === null || updatedStudent === void 0 ? void 0 : updatedStudent.grades.find((x) => x._id == grade._id);
    }
    catch (err) {
        throw new errorTypes_1.ErrorWithStatusCode(err.message, errorStatusConstants_1.default.BAD_REQUEST);
    }
});
exports.updateGrade = updateGrade;
function getStudentByUserId(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield student_1.default.findOne({ userId: _id });
        if (!student)
            throw new errorTypes_1.ErrorWithStatusCode("Student not found.", 404);
        return student;
    });
}
