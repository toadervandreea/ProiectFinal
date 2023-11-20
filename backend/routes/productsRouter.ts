import { Request, Response, Router } from 'express';
import * as prodModel from '../models/product';
import { Products } from '../types/Products';

const prodRouter = Router();

// Obține toate categoriile
prodRouter.get("/categories", async (_req: Request, res: Response) => {
  prodModel.getAllCategories((err: Error | null, categories?: string[]) => {
    if (err) {
      return res.status(500).json({ "errorMessage": err.message });
    }

    res.status(200).json( categories );
  });
});


// Obține produsele bazate pe categorie
prodRouter.get("/categories/:category", (req: Request, res: Response) => {
  const { category } = req.params;

  prodModel.findByCategory(category, (err, products) => {
      if (err) {
          console.error('Eroare la obținerea produselor din categorie:', err);
          res.status(500).json({ message: 'Eroare la obținerea produselor din categorie' });
      } else {
          res.status(200).json( products);
      }
  });
});


// Obține produsele bazate pe categorie
prodRouter.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;
  console.log('Category:', category);
  console.log('Request:', req);
  if (category) {
    prodModel.findByCategory(category as string, (err, products) => {
      if (err) {
        return res.status(500).json({ "errorMessage": err.message });
      }

      res.status(200).json( products );
    });
  } else {
    prodModel.findAll((err: Error, products: Products) => {
      if (err) {
        return res.status(500).json({ "errorMessage": err.message });
      }

      res.status(200).json({ "data": products });
    });
  }
});

export { prodRouter };
