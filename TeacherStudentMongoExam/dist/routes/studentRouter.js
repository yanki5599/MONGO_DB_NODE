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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController = __importStar(require("../controllers/studentController"));
const studentMiddleware_1 = require("../middleware/studentMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
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
router.use(authMiddleware_1.authMiddleware);
router.use(studentMiddleware_1.studentMiddleware);
router.route("/grades").get(studentController.getGrades);
exports.default = router;
