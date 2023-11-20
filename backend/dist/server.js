"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const userRouter_1 = require("./routes/userRouter");
const productsRouter_1 = require("./routes/productsRouter");
const reviewsRouter_1 = __importDefault(require("./routes/reviewsRouter"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const jsonParser = body_parser_1.default.json();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/users", userRouter_1.userRouter);
app.use("/products", productsRouter_1.prodRouter);
app.use("/reviews", reviewsRouter_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/acasa.html'));
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
// Verifică conexiunea la baza de date
db_1.db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
        process.exit(1);
    }
    console.log('Conectare la baza de date reușită!');
});
