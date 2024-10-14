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
exports.getUserById = exports.authenticateUser = exports.createUser = void 0;
const errorTypes_1 = require("../models/errorTypes");
const collageUser_1 = __importDefault(require("../models/collageUser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newUser.email || !newUser.password) {
        throw new errorTypes_1.ErrorWithStatusCode("passportId and password are required", 400);
    }
    const user = yield collageUser_1.default.findOne({ email: newUser.email });
    if (user) {
        throw new errorTypes_1.ErrorWithStatusCode("User already exists", 409);
    }
    newUser.password = yield bcrypt_1.default.hash(newUser.password.toString(), SALT_ROUNDS);
    try {
        const added = yield collageUser_1.default.create(newUser);
        return added;
    }
    catch (error) {
        throw new errorTypes_1.ErrorWithStatusCode(error.message, 400);
    }
});
exports.createUser = createUser;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        throw new errorTypes_1.ErrorWithStatusCode("email and password are required", 401);
    }
    const user = yield collageUser_1.default.findOne({ email });
    if (!user) {
        throw new errorTypes_1.ErrorWithStatusCode("User not found", 401);
    }
    if (!(yield bcrypt_1.default.compare(password.toString(), user.password))) {
        throw new errorTypes_1.ErrorWithStatusCode("invalid id or password", 401);
    }
    return user;
});
exports.authenticateUser = authenticateUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield collageUser_1.default.findById(id);
    if (!user) {
        throw new errorTypes_1.ErrorWithStatusCode("User not found", 404);
    }
    return user;
});
exports.getUserById = getUserById;
