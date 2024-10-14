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
exports.getStudentsAvg = exports.getStudents = exports.validateStudent = exports.getTeacherById = exports.addGradeForStudent = exports.create = void 0;
exports.getTeacherByUserId = getTeacherByUserId;
const errorTypes_1 = require("../models/errorTypes");
const userService = __importStar(require("./userService"));
const teacher_1 = __importDefault(require("../models/teacher"));
const role_1 = require("../models/role");
const classRoom_1 = __importDefault(require("../models/classRoom"));
const classRoomService = __importStar(require("./classRoomService"));
const errorStatusConstants_1 = __importDefault(require("../models/errorStatusConstants"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_1 = __importDefault(require("../models/student"));
const create = (newTeacher, className) => __awaiter(void 0, void 0, void 0, function* () {
    newTeacher.role = role_1.Role.TEACHER;
    const addedUser = yield userService.createUser(newTeacher);
    try {
        if (yield classRoomService.getClassRoomTeacher(className)) {
            throw new errorTypes_1.ErrorWithStatusCode("Classroom already exists", errorStatusConstants_1.default.CONFLICT);
        }
        // create teacher
        newTeacher.userId = addedUser._id;
        const added = yield teacher_1.default.create(newTeacher);
        // create classroom
        const newClassRoom = yield classRoom_1.default.create({
            name: className,
            teacherId: added._id,
        });
        return yield newClassRoom;
    }
    catch (error) {
        throw new errorTypes_1.ErrorWithStatusCode(error.message, 400);
    }
});
exports.create = create;
const addGradeForStudent = (studentId, grade, node) => __awaiter(void 0, void 0, void 0, function* () { });
exports.addGradeForStudent = addGradeForStudent;
const getTeacherById = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_1.default.findById(teacherId).populate("userId");
    if (!teacher) {
        throw new errorTypes_1.ErrorWithStatusCode("Teacher not found", 404);
    }
    return teacher;
});
exports.getTeacherById = getTeacherById;
const validateStudent = (teacherId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("validateStudent");
    console.log("teacherId", teacherId);
    console.log("studentId", studentId);
    const teacher = yield (0, exports.getTeacherById)(teacherId);
    if (!teacher.students.includes(new mongoose_1.default.Types.ObjectId(studentId)))
        throw new errorTypes_1.ErrorWithStatusCode("Student is not in your class", errorStatusConstants_1.default.FORBIDDEN);
    return true;
});
exports.validateStudent = validateStudent;
const getStudents = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_1.default
        .findById(teacherId)
        .populate({ path: "students", populate: { path: "userId" } });
    if (!teacher)
        throw new errorTypes_1.ErrorWithStatusCode("Teacher not found", errorStatusConstants_1.default.NOT_FOUND);
    return teacher;
});
exports.getStudents = getStudents;
const getStudentsAvg = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield (0, exports.getStudents)(teacherId);
    // get teacher with students and calculate average of their grades for each student
    const result = yield student_1.default.aggregate([
        {
            $match: { _id: { $in: teacher.students } },
        },
        {
            $group: {
                _id: "$_id",
                avg: {
                    $avg: "$grades.grade",
                },
            },
        },
    ]);
    return result;
});
exports.getStudentsAvg = getStudentsAvg;
function getTeacherByUserId(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield teacher_1.default.findOne({ userId: _id });
        if (!teacher)
            throw new errorTypes_1.ErrorWithStatusCode("Teacher not found.", 404);
        return teacher;
    });
}
