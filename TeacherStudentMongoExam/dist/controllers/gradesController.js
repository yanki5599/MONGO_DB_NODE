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
exports.deleteStudent = exports.getAverageGrade = exports.updateGrade = exports.removeGrade = exports.addGrade = exports.getGrades = void 0;
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js"));
const role_js_1 = require("../models/role.js");
const userService = __importStar(require("../services/userService.js"));
// of id ,  for both /student and /teacher/:id
exports.getGrades = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wantedUser = req.user.role === role_js_1.Role.STUDENT
        ? req.user
        : yield userService.getUserByPassportId(req.params.id);
    const grades = wantedUser.grades;
    res.status(200).json({ success: true, data: grades });
}));
exports.addGrade = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newGrade = req.body;
    yield userService.addGrade(req.params.id, newGrade);
    res.status(200).json({ success: true });
}));
exports.removeGrade = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.removeGrade(req.params.id, req.body.gradeSubject);
    res.status(200).json({ success: true });
}));
exports.updateGrade = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newGrade = req.body;
    yield userService.updateGrade(req.params.id, newGrade);
    res.status(200).json({ success: true });
}));
// of id , for both /student and /teachers/:id
exports.getAverageGrade = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wantedUser = req.user.role === role_js_1.Role.STUDENT
        ? req.user
        : yield userService.getUserByPassportId(req.params.id);
    // calculate avg of all grades of wanted user
    const avgGrade = yield userService.getAverageGrade(wantedUser);
    res.status(200).json({ success: true, data: avgGrade });
}));
exports.deleteStudent = (0, asyncHandler_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.deleteUser(req.params.id);
    res.status(204).json({ success: true });
}));
