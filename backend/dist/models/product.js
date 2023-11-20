"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findImage = exports.getAllCategories = exports.findByCategory = exports.findAll = void 0;
const db_1 = require("../db");
// Get all Products
const findAll = (callback) => {
    const queryString = `SELECT * FROM products`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach((row) => {
            const product = {
                id: row.id,
                nume_produs: row.nume_produs,
                descriere_produs: row.descriere_produs,
                poza_url: row.poza_url,
                categorie_produs: row.categorie_produs,
                pret_produs: row.pret_produs,
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
//category
const findByCategory = (category, callback) => {
    const queryString = 'SELECT * FROM products WHERE categorie_produs = ?';
    db_1.db.query(queryString, [category], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const products = result;
        callback(null, products);
    });
};
exports.findByCategory = findByCategory;
//category 
const getAllCategories = (callback) => {
    const queryString = 'SELECT DISTINCT categorie_produs FROM products';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const rows = result;
        const categories = rows.map((row) => row.categorie_produs);
        callback(null, categories);
    });
};
exports.getAllCategories = getAllCategories;
function findImage(productId, arg1) {
    throw new Error("Function not implemented.");
}
exports.findImage = findImage;
