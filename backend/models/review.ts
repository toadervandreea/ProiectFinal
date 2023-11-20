import { OkPacket, RowDataPacket } from "mysql2";
import { db } from "../db";
import { Review } from "../types/Reviews";

// Adaugă un review în baza de date
const addReview = (message: string, callback: (err: any, result?: OkPacket) => void) => {
  const queryString = 'INSERT INTO reviews (message) VALUES (?)';
  db.query(queryString, [message], (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    if (callback) {
      callback(null, result as OkPacket);
    }
  });
};

// Obține toate review-urile din baza de date
const getAllReviews = (callback: (err: any, result?: RowDataPacket[]) => void) => {
  const queryString = 'SELECT * FROM reviews';
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    if (callback) {
      callback(null, result as RowDataPacket[]);
    }
  });
};

// Obține un review după ID
const getReviewById = (id: number, callback: (err: any, result?: RowDataPacket) => void) => {
  const queryString = 'SELECT * FROM reviews WHERE id = ?';
  db.query(queryString, [id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    if (Array.isArray(result) && result.length > 0) {
      callback(null, result[0] as RowDataPacket);
    } else {
      callback({ message: 'Review-ul nu a fost găsit.' });
    }
  });
};



// Actualizează un review după ID
const updateReviewById = (id: number, message: string, callback: (err: any) => void) => {
  const queryString = 'UPDATE reviews SET message = ? WHERE id = ?';
  db.query(queryString, [message, id], (err, result) => {
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

// Șterge un review după ID
const deleteReviewById = (id: number, callback: (err: any) => void) => {
  const queryString = 'DELETE FROM reviews WHERE id = ?';
  db.query(queryString, [id], (err) => {
    if (err) {
      callback(err);
      return;
    }

    if (callback) {
      callback(null);
    }
  });
};

export { addReview, getAllReviews, getReviewById, updateReviewById, deleteReviewById, Review };
