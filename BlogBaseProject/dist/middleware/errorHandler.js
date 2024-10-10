"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;
    if (statusCode === 500) {
        console.log(err);
    }
    res.status(statusCode).send({ success: false, message: message });
    return;
};
exports.errorHandler = errorHandler;
