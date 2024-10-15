"use strict";
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
exports.getClassIdByName = exports.getClassRoomTeacher = void 0;
const classRoom_1 = __importDefault(require("../models/classRoom"));
const teacher_1 = __importDefault(require("../models/teacher"));
const errorStatusConstants_1 = __importDefault(require("../models/errorStatusConstants"));
const errorTypes_1 = require("../models/errorTypes");
const getClassRoomTeacher = (classRoomName) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoom = yield classRoom_1.default.findOne({ name: classRoomName });
    if (!classRoom) {
        return undefined;
    }
    const teacher = yield teacher_1.default.findById(classRoom.teacherId);
    if (!teacher) {
        throw new errorTypes_1.ErrorWithStatusCode("Teacher not found", errorStatusConstants_1.default.NOT_FOUND);
    }
    return teacher;
});
exports.getClassRoomTeacher = getClassRoomTeacher;
const getClassIdByName = (classRoomName) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoom = yield classRoom_1.default.findOne({ name: classRoomName });
    if (!classRoom) {
        throw new errorTypes_1.ErrorWithStatusCode("Classroom not found", errorStatusConstants_1.default.NOT_FOUND);
    }
    return classRoom.id;
});
exports.getClassIdByName = getClassIdByName;
