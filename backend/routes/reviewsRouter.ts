import * as reviewModel from '../models/review';
import { Request, Response, Router } from 'express';

const router = Router();

// Adaugă un review
router.post('/', (req: Request<{}, {}, { message: string }>, res: Response<any>) => {
    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Cererea nu conține un mesaj valid.' });
    }

    reviewModel.addReview(message, (err: any, result: any) => {
        if (err) {
            console.error('Eroare la adăugarea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }

        console.log('Review adăugat cu succes!');
        res.status(201).json({ message: 'Review-ul a fost trimis cu succes.' });
    });
});

// Obține toate review-urile
router.get('/', (req: Request, res: Response) => {
    reviewModel.getAllReviews((err: any, result: any) => {
        if (err) {
            console.error('Eroare la obținerea review-urilor:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }

        res.status(200).json( result);
    });
});

// Obține un review după ID
router.get('/:id', (req: Request, res: Response) => {
    const reviewId: number = parseInt(req.params.id, 10);

    // Verifică dacă reviewId este un număr valid
    if (isNaN(reviewId) || !Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({ error: 'ID-ul review-ului nu este valid.' });
    }

    reviewModel.getReviewById(reviewId, (err: any, result: any) => {
        if (err) {
            console.error('Eroare la obținerea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }

        res.status(200).json( result);
    });
});


// Actualizează un review după ID
router.put('/:id', (req: Request, res: Response) => {
    const reviewId: number = Number(req.params.id);
    const { message } = req.body as { message: string };

    // Verifică dacă reviewId este un număr valid
    if (isNaN(reviewId)) {
        return res.status(400).json({ error: 'ID-ul review-ului nu este valid.' });
    }

    reviewModel.updateReviewById(reviewId, message, (err: any) => {
        if (err) {
            console.error('Eroare la actualizarea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }

        res.status(200).json({ message: 'Review-ul a fost actualizat cu succes.' });
    });
});





// Șterge un review după ID
router.delete('/:id', (req: Request, res: Response) => {
    const reviewId: number = Number(req.params.id);

    reviewModel.deleteReviewById(reviewId, (err: any) => {
        if (err) {
            console.error('Eroare la ștergerea review-ului:', err);
            return res.status(500).json({ error: 'Eroare internă la server.' });
        }

        res.status(200).json({ message: 'Review-ul a fost șters cu succes.' });
    });
});

export default router;
