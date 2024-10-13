"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const collageUserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "Name cannot be more than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
});
exports.default = mongoose_1.default.model("CollageUser", collageUserSchema);
