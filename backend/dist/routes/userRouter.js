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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const userModel = __importStar(require("../models/user"));
const user_1 = require("../models/user");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const jsonParser = bodyParser.json();
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel.findAll((err, users) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "users": users });
    });
}));
// signup
userRouter.post("/signup", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Route /signup is called");
    console.log("Request body:", req.body);
    console.log(req.body);
    const newUser = req.body;
    if (newUser.id && isNaN(newUser.id)) {
        return res.status(400).json({ "message": 'Invalid user ID' });
    }
    userModel.create(newUser)
        .then((userId) => {
        if (userId !== null) {
            res.status(200).json({ userId });
        }
        else {
            res.status(500).json({ "message": 'Error creating user' });
        }
    })
        .catch((err) => {
        res.status(500).json({ "message": err.message });
    });
}));
// signup
userRouter.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'GET /users/signup received' });
}));
//login
userRouter.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'GET /users/signup received' });
}));
//login
userRouter.post("/login", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Route /login is called");
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ "message": 'Email and password are required' });
    }
    try {
        const user = yield (0, user_1.findByEmailAndPassword)(email, password);
        if (user) {
            return res.status(200).json({ "message": 'Login successful', user });
        }
        else {
            // Utilizatorul nu a fost găsit
            return res.status(401).json({ "message": 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ "message": 'Internal server error' });
    }
}));
userRouter.post("/", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newUser = req.body;
    // Verifică dacă userId este un număr valid
    if (isNaN(newUser.id)) {
        return res.status(400).json({ "message": 'Invalid user ID' });
    }
    userModel.create(newUser)
        .then((userId) => {
        if (userId !== null) {
            res.status(200).json({ "userId": userId });
        }
        else {
            res.status(500).json({ "message": 'Error creating user' });
        }
    })
        .catch((err) => {
        res.status(500).json({ "message": err.message });
    });
}));
