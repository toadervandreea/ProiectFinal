"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewById = exports.updateReviewById = exports.getReviewById = exports.getAllReviews = exports.addReview = void 0;
const db_1 = require("../db");
// Adaugă un review în baza de date
const addReview = (message, callback) => {
    const queryString = 'INSERT INTO reviews (message) VALUES (?)';
    db_1.db.query(queryString, [message], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (callback) {
            callback(null, result);
        }
    });
};
exports.addReview = addReview;
// Obține toate review-urile din baza de date
const getAllReviews = (callback) => {
    const queryString = 'SELECT * FROM reviews';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (callback) {
            callback(null, result);
        }
    });
};
exports.getAllReviews = getAllReviews;
// Obține un review după ID
const getReviewById = (id, callback) => {
    const queryString = 'SELECT * FROM reviews WHERE id = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (Array.isArray(result) && result.length > 0) {
            callback(null, result[0]);
        }
        else {
            callback({ message: 'Review-ul nu a fost găsit.' });
        }
    });
};
exports.getReviewById = getReviewById;
// Actualizează un review după ID
const updateReviewById = (id, message, callback) => {
    const queryString = 'UPDATE reviews SET message = ? WHERE id = ?';
    db_1.db.query(queryString, [message, id], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if ('affectedRows' in result) {
            if (result.affectedRows === 0) {
                callback({ message: 'Review-ul nu a fost găsit.' });
                return;
            }
        }
        callback(null);
    });
};
exports.updateReviewById = updateReviewById;
// Șterge un review după ID
const deleteReviewById = (id, callback) => {
    const queryString = 'DELETE FROM reviews WHERE id = ?';
    db_1.db.query(queryString, [id], (err) => {
        if (err) {
            callback(err);
            return;
        }
        if (callback) {
            callback(null);
        }
    });
};
exports.deleteReviewById = deleteReviewById;
