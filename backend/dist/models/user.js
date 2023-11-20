"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findByEmailAndPassword = exports.findOne = exports.findAll = void 0;
const db_1 = require("../db");
const query = (queryString, values) => {
    return new Promise((resolve, reject) => {
        db_1.db.query(queryString, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            const rows = result;
            resolve(rows);
        });
    });
};
// Get all users
const findAll = (callback) => {
    const queryString = `SELECT * FROM jsusers`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const users = [];
        rows.forEach((row) => {
            const user = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                datanastere: row.datanastere,
                telefon: row.telefon,
                dataadaugare: row.dataadaugare,
                actiune: "",
                password: row.password,
            };
            users.push(user);
        });
        callback(null, users);
    });
};
exports.findAll = findAll;
// Get one user
const findOne = (userId) => {
    return new Promise((resolve, reject) => {
        if (isNaN(userId)) {
            reject(new Error('Invalid user ID'));
        }
        const queryString = `SELECT * FROM jsusers WHERE id=?`;
        db_1.db.query(queryString, userId, (err, result) => {
            if (err) {
                reject(err);
            }
            const rows = result;
            if (rows.length === 0) {
                resolve(null);
            }
            const row = rows[0];
            const user = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                datanastere: row.datanastere,
                telefon: row.telefon,
                password: row.password,
            };
            resolve(user);
        });
    });
};
exports.findOne = findOne;
// login
const findByEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        const queryString = 'SELECT * FROM jsusers WHERE email = ? AND password = ?';
        db_1.db.query(queryString, [email, password], (err, result) => {
            if (err) {
                reject(err);
            }
            const rows = result;
            if (rows.length === 0) {
                resolve(null);
            }
            const row = rows[0];
            const user = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                datanastere: row.datanastere,
                telefon: row.telefon,
                password: row.password,
            };
            resolve(user);
        });
    });
};
exports.findByEmailAndPassword = findByEmailAndPassword;
// create user
const create = (user) => {
    return new Promise((resolve, reject) => {
        const queryString = "INSERT INTO jsusers (nume, prenume, email, datanastere, telefon, password) VALUES (?, ?, ?, ?, ?, ?)";
        db_1.db.query(queryString, [user.nume, user.prenume, user.email, user.datanastere, user.telefon, user.password], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            const insertId = (result && result.insertId) || null;
            resolve(insertId);
        });
    });
};
exports.create = create;
