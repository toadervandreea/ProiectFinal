import { User } from "./../types/User";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

const query = (queryString: string, values: any[]): Promise<RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    db.query(queryString, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const rows = <RowDataPacket[]>result;
      resolve(rows);
    });
  });
};

// Get all users
export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM jsusers`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    const users: User[] = [];
    rows.forEach((row) => {
      const user: User = {
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
// Get one user
export const findOne = (userId: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    if (isNaN(userId)) {
      reject(new Error('Invalid user ID'));
    }

    const queryString = `SELECT * FROM jsusers WHERE id=?`;
    db.query(queryString, userId, (err, result) => {
      if (err) {
        reject(err);
      }

      const rows = <RowDataPacket[]>result;
      if (rows.length === 0) {
        resolve(null); 
      }

      const row = rows[0];
      const user: User = {
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
// login
export const findByEmailAndPassword = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM jsusers WHERE email = ? AND password = ?';
    db.query(queryString, [email, password], (err, result) => {
      if (err) {
        reject(err);
      }

      const rows = <RowDataPacket[]>result;
      if (rows.length === 0) {
        resolve(null); 
      }
      const row = rows[0];
      const user: User = {
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

// create user
export const create = (user: User): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const queryString =
      "INSERT INTO jsusers (nume, prenume, email, datanastere, telefon, password) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(
      queryString,
      [user.nume, user.prenume, user.email, user.datanastere, user.telefon, user.password],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
    
        const insertId = (result && (<OkPacket>result).insertId) || null;
        resolve(insertId);
      }
    );
  });
};



