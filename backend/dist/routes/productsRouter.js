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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodRouter = void 0;
const express_1 = require("express");
const prodModel = __importStar(require("../models/product"));
const prodRouter = (0, express_1.Router)();
exports.prodRouter = prodRouter;
// Obține toate categoriile
prodRouter.get("/categories", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    prodModel.getAllCategories((err, categories) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json(categories);
    });
}));
// Obține produsele bazate pe categorie
prodRouter.get("/categories/:category", (req, res) => {
    const { category } = req.params;
    prodModel.findByCategory(category, (err, products) => {
        if (err) {
            console.error('Eroare la obținerea produselor din categorie:', err);
            res.status(500).json({ message: 'Eroare la obținerea produselor din categorie' });
        }
        else {
            res.status(200).json(products);
        }
    });
});
// Obține produsele bazate pe categorie
prodRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    console.log('Category:', category);
    console.log('Request:', req);
    if (category) {
        prodModel.findByCategory(category, (err, products) => {
            if (err) {
                return res.status(500).json({ "errorMessage": err.message });
            }
            res.status(200).json(products);
        });
    }
    else {
        prodModel.findAll((err, products) => {
            if (err) {
                return res.status(500).json({ "errorMessage": err.message });
            }
            res.status(200).json({ "data": products });
        });
    }
}));
