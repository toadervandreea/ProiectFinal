import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3002/reviews';

  constructor(private http: HttpClient) {}

  submitReview(reviewData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(this.apiUrl, reviewData, { headers }).pipe(
      catchError((error) => {
        console.error('Eroare la trimiterea review-ului', error);
        throw error;
      })
    );
  }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Eroare la obținerea recenziilor', error);
        throw error;
      })
    );
  }
  updateReviewById(reviewId: number, updatedMessage: string): Observable<any> {
    if (!Number.isInteger(reviewId) || reviewId <= 0) {
      console.error('ID-ul review-ului nu este valid.');
      return throwError('ID-ul review-ului nu este valid.');
    }
  
    const url = `${this.apiUrl}/${reviewId}`;
    const headers = { 'Content-Type': 'application/json' };
    const body = { message: updatedMessage };
  
    return this.http.put(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Eroare la actualizarea review-ului', error);
        console.error('Detalii eroare:', error.error);
        return throwError(error);
      })
    );
  }
  
  
  
  deleteReviewById(reviewId: number): Observable<any> {
    const url = `${this.apiUrl}/${reviewId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error(`Eroare la ștergerea review-ului cu ID ${reviewId}`, error);
        throw error;
      })
    );
  }
  
}
