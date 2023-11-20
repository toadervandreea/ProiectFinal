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
Object.defineProperty(exports, "__esModule", { value: true });
const reviewModel = __importStar(require("../models/review"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// Adaugă un review
router.post('/', (req, res) => {
    const { message } = req.body;
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Cererea nu conține un mesaj valid.' });
    }
    reviewModel.addReview(message, (err, result) => {
        if (err) {
            console.error('Eroare la adăugarea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }
        console.log('Review adăugat cu succes!');
        res.status(201).json({ message: 'Review-ul a fost trimis cu succes.' });
    });
});
// Obține toate review-urile
router.get('/', (req, res) => {
    reviewModel.getAllReviews((err, result) => {
        if (err) {
            console.error('Eroare la obținerea review-urilor:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }
        res.status(200).json(result);
    });
});
// Obține un review după ID
router.get('/:id', (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    // Verifică dacă reviewId este un număr valid
    if (isNaN(reviewId) || !Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({ error: 'ID-ul review-ului nu este valid.' });
    }
    reviewModel.getReviewById(reviewId, (err, result) => {
        if (err) {
            console.error('Eroare la obținerea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }
        res.status(200).json(result);
    });
});
// Actualizează un review după ID
router.put('/:id', (req, res) => {
    const reviewId = Number(req.params.id);
    const { message } = req.body;
    // Verifică dacă reviewId este un număr valid
    if (isNaN(reviewId)) {
        return res.status(400).json({ error: 'ID-ul review-ului nu este valid.' });
    }
    reviewModel.updateReviewById(reviewId, message, (err) => {
        if (err) {
            console.error('Eroare la actualizarea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }
        res.status(200).json({ message: 'Review-ul a fost actualizat cu succes.' });
    });
});
// Șterge un review după ID
router.delete('/:id', (req, res) => {
    const reviewId = Number(req.params.id);
    reviewModel.deleteReviewById(reviewId, (err) => {
        if (err) {
            console.error('Eroare la ștergerea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }
        res.status(200).json({ message: 'Review-ul a fost șters cu succes.' });
    });
});
exports.default = router;
