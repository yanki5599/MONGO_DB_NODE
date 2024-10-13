"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherMiddleware = void 0;
const role_js_1 = require("../models/role.js");
const teacherMiddleware = (req, res, next) => {
    if (req.user.role !== role_js_1.Role.TEACHER) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports.teacherMiddleware = teacherMiddleware;
