import { Products } from "./../types/Products";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// Get all Products

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM products`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err); 
    }
    const rows = <RowDataPacket[]>result;
    const products: Products[] = [];
    rows.forEach((row) => {
      const product: Products = {
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


//category
export const findByCategory = (category: string, callback: (err: Error | null, products?: Products[]) => void) => {
  const queryString = 'SELECT * FROM products WHERE categorie_produs = ?';
  db.query(queryString, [category], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const products = result as Products[];
    callback(null, products);
  });
};

//category 
export const getAllCategories = (callback: Function) => {
  const queryString = 'SELECT DISTINCT categorie_produs FROM products';
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    const rows = result as RowDataPacket[];
    const categories = rows.map((row) => row.categorie_produs);
    callback(null, categories);
  });
};


export function findImage(productId: number, arg1: (err: Error, imageData: Buffer) => import("express").Response<any, Record<string, any>> | undefined) {
  throw new Error("Function not implemented.");
}









