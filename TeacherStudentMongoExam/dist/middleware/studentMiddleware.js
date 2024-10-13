"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentMiddleware = void 0;
const role_js_1 = require("../models/role.js");
const studentMiddleware = (req, res, next) => {
    if (req.user.role !== role_js_1.Role.STUDENT) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports.studentMiddleware = studentMiddleware;
